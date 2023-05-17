# Bond filmer API 
## Endpoints 

### GET /movies
This endpoint retrieves a list of all Bond films.

Example: http://localhost:3005/movies?apiKey=6

Response:
json
[
  {
    "imdbID": "tt1234567",
    "Title": "Movie 1",
    "Year": "2021",
    "Released": "2021-01-01",
    "Genre": "Action"
  },
  {
    "imdbID": "tt2345678",
    "Title": "Movie 2",
    "Year": "2022",
    "Released": "2022-02-02",
    "Genre": "Adventure"
  },
  ...
]

### GET /movies/:id
This endpoint retrieves a specific Bond film based on its ID.

Example: http://localhost:3005/movies/tt1234567?apiKey=6

Response:
json
{
  "imdbID": "tt1234567",
  "Title": "Movie 1",
  "Year": "2021",
  "Released": "2021-01-01",
  "Genre": "Action"
}

### POST /movies
This endpoint adds a new Bond film to the collection.

Example: http://localhost:3005/movies?apiKey=6

Request Body:
json

{
  "movie": {
    "Title": "New Movie",
    "Year": "2023",
    "Released": "2023-03-03",
    "Genre": "Thriller"
  }
}
Response:
json

{
  "imdbID": 3245,
  "Title": "New Movie",
  "Year": "2023",
  "Released": "2023-03-03",
  "Genre": "Thriller"
}


### PUT /movies/:id
This endpoint updates an existing Bond film based on its ID.

Example: http://localhost:3005/movies/tt1234567?apiKey=6

Request Body:
json
{
  "movie": {
    "Title": "Updated Movie",
    "Year": "2023",
    "Released": "2023-05-17",
    "Genre": "Action"
  }
}

Response:
json
{
  "imdbID": "tt1234567",
  "Title": "Updated Movie",
  "Year": "2023",
  "Released": "2023-05-17",
  "Genre": "Action"
}


### DELETE /movies/:id
This endpoint deletes a Bond film based on its ID.

Example: http://localhost:3005/movies/tt1234567?apiKey=6

Response:
json
{
  "message": "Filmen har blivit borttagen!"
}


## remove API key 
````
app.delete("/apiKeys/:apiKey", (req, res) => {
  const apiKey = req.params.apiKey;

  if (!validApiKeys.includes(apiKey)) {
    return res
    .status(404)
    .json({ message: "API-nyckeln hittades inte." });
  }

  validApiKeys = validApiKeys.filter((key) => key !== apiKey);
  res
  .json({ message: "API-nyckeln har tagits bort." });
});
````
1. app.delete("/apiKeys/:apiKey", (req, res) => { ... }): This sets up a route for handling DELETE requests at the "/apiKeys/:apiKey" endpoint. ":apiKey" is a route parameter that represents the specific API key to be deleted.

2. const apiKey = req.params.apiKey;: This line retrieves the value of the ":apiKey" parameter from the request's URL and assigns it to the apiKey variable.

3. if (!validApiKeys.includes(apiKey)) { ... }: This checks if the apiKey exists in the validApiKeys array. If it doesn't, the code inside the if statement will be executed.

4. return res.status(404).json({ message: "API-nyckeln hittades inte." });: If the apiKey doesn't exist in the validApiKeys array, a 404 Not Found response is returned with a JSON payload containing the message "API-nyckeln hittades inte." 

5. validApiKeys = validApiKeys.filter((key) => key !== apiKey);: This line removes the apiKey from the validApiKeys array by filtering out any elements that are equal to apiKey.

6. res.json({ message: "API-nyckeln har tagits bort." });: After successfully removing the apiKey, a JSON response is sent back with a message confirming that the API key has been removed.


## add api key
````
app.post("/apiKeys", (req, res) => {
  const apiKey = req.body.apiKey;

  if (!apiKey || validApiKeys.includes(apiKey)) {
    return res
    .status(400)
    .json({ message: "Ogiltig API-nyckel." });
  }

  validApiKeys.push(apiKey);
  res
  .json({ message: "API-nyckeln har lagts till." });
});
````
1. app.post("/apiKeys", (req, res) => { ... }): This sets up a route for handling POST requests at the "/apiKeys" endpoint.

2. const apiKey = req.body.apiKey;: This line retrieves the value of the "apiKey" property from the request's body and assigns it to the apiKey variable. The assumption here is that the API key is included in the request body.

3. if (!apiKey || validApiKeys.includes(apiKey)) { ... }: This checks if the apiKey is empty or if it already exists in the validApiKeys array. If either condition is true, the code inside the if statement will be executed.

4. return res.status(400).json({ message: "Ogiltig API-nyckel." });: If the apiKey is empty or already exists in the validApiKeys array, a 400 Bad Request response is returned with a JSON payload containing the message "Ogiltig API-nyckel." 

5. validApiKeys.push(apiKey);: If the apiKey is valid (i.e., not empty and not already existing in validApiKeys), it is added to the validApiKeys array using the push() method.

6. res.json({ message: "API-nyckeln har lagts till." });: After successfully adding the apiKey to the validApiKeys array, a JSON response is sent back with a message confirming that the API key has been added.
