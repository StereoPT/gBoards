const express = require('express'),
      cors = require('cors');
const app = express();

let MongoHelper = require('./helpers/MongoHelper');
let mongoHelper = new MongoHelper();

console.log("[gBoards] API");

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/boards', (req, res) => {
  mongoHelper.ListBoards((result) => {
    res.send(result);
  });
});

const port = 2909;
app.listen(port, () => {
  console.log(`[gBoards] Listening on Port: ${port}`);
});
