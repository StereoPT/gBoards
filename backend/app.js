const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const app = express();

let MongoHelper = require('./helpers/MongoHelper');
let mongoHelper = new MongoHelper();

console.log("[gBoards] API");

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/boards', (req, res) => {
  mongoHelper.ListBoards((result) => {
    res.send(result);
  });
});

app.get('/boards/:id', (req, res) => {
  let boardID = Number(req.params.id);
  mongoHelper.ListBoard(boardID, (result) => {
    res.send(result);
  });
});

app.post('/boards/add', (req, res) => {
  let boardToAdd = req.body;
  mongoHelper.AddBoard(boardToAdd, (result) => {
    res.send(result);
  });
});

const port = 2909;
app.listen(port, () => {
  console.log(`[gBoards] Listening on Port: ${port}`);
});
