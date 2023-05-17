const express = require('express')
const movies = require('./routes/movies')
const app = express()
const port = 3005

app.use(express.json());

// Lista med giltiga API-nycklar
let validApiKeys = ['6', '4', '7', '9']; 

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey || !validApiKeys.includes(apiKey)) {
    return res
    .status(403)
    .json({ message: "Ogiltig API-nyckel." });
  }

  next();
};

app.use((req, res, next) => {
  authenticateApiKey(req, res, next);
});

app.get('/', (req, res) => {
  res.send('Hej!');
});

app.use("/movies", movies);

// GET /apiKeys: Hämta en lista med giltiga API-nycklar.
app.get("/apiKeys", (req, res) => {
  res.json(validApiKeys);
});

// POST /apiKeys: Lägg till en ny API-nyckel i listan över giltiga nycklar.
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

// DELETE /apiKeys/:apiKey: Ta bort en API-nyckel från listan över giltiga nycklar.
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
