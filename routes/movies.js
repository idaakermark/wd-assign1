const express = require("express")
const router = express.Router()
const mockData = require("../mockData")

let movies = mockData;

// GET /movies: Hämta en lista med alla Bondfilmer.
// http://localhost:3005/movies?apiKey=6
router.get("/", (req, res) => {
    res.json(movies)
    }) 

//GET /movies/:id: Hämta en specifik Bondfilm baserat på dess ID.
//  postman: http://localhost:3005/movies/:imdbID=tt14888860?apiKey=6
router.get("/:id/", (req, res) => {
    const imdbID = req.params.imdbID
    const movie = movies.find(movie => movie.imdbID === imdbID)

    if (!movie) {
        return res
        .status(404)
        .json({ message: "ingen film med det idt kunde hittas!"})
    }
    res.json(movie)

})

// POST /movies: Lägg till en ny Bondfilm.
// http://localhost:3005/movies?apiKey=6

let nextImdbID = 3245
router.post('/', (req, res) => {
    const movie = req.body.movie

    if (!movie.Title || !movie.Year || !movie.Released || !movie.Genre) {
        return res 
        .status(400)
        .json({ message: "Alla obligatoriska fält måste fyllas i." })
      }
    
      if (isNaN(movie.Year) || isNaN(movie.Released)) {
        return res 
        .status(400)
        .json ({ message: "Year och reseased måste vara ett nummer" })
      }

    const newMovie = {
        ...movie, 
        imdbID: nextImdbID
    }
    nextImdbID++

    movies.push(newMovie)
    console.log(newMovie)
   res.json(newMovie)
})

//PUT /movies/:id: Uppdatera en befintlig Bondfilm baserat på dess ID.
// http://localhost:3005/movies/tt3732110?apiKey=6

router.put('/:imdbID', (req, res) => {
    const imdbID = req.params.imdbID
    const movie = req.body.movie
    const index = movies.findIndex((film) => film.imdbID === imdbID)

    if (!movie.Title || !movie.Year || !movie.Released || !movie.Genre) {
        return res 
        .status(400)
        .json({ message: "Alla obligatoriska fält måste fyllas i." })
      }
    
      if (isNaN(movie.Year) || isNaN(movie.Released)) {
        return res 
        .status(400)
        .json ({ message: "Year och reseased måste vara ett nummer" })
    }
   
    if (index === -1) {
        return res
        .status(404)
        .json({ message: "Movie doesnt exist" })
    }
   
    const updatedMovie = { ...movies[index], ...movie }
      console.log({ imdbID, movie})
      movie[index] = updatedMovie
    
      res.json(updatedMovie) 
})


//DELETE /movies/:id: Ta bort en Bondfilm baserat på dess ID.
// http://localhost:3005/movies/tt3732110?apiKey=6
router.delete("/:imdbID", (req, res) => {
    
    const imdbID = req.params.imdbID
    const movie = movies.find((movie) => movie.imdbID === imdbID)

    if (!movie) {
        return res 
        .status(404)
        .json({ message: "Det finns ingen film med det idt!"})
    }

    const newData = movies.filter((movie) => movie.id !== imdbID)
    movies = newData
    res.json({ message: "Filmen har blivit borttagen!"}) 
 })

module.exports = router 