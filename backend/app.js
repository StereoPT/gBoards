const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors');
const app = express();

const boardRouter = express.Router();
const listRouter = express.Router();

let MongoHelper = require('./helpers/MongoHelper'),
    BoardHelper = require('./helpers/BoardHelper');
    ListHelper = require('./helpers/ListHelper');

let mongoHelper = new MongoHelper(),
    boardHelper = new BoardHelper(boardRouter, mongoHelper);
    listHelper = new ListHelper(listRouter, mongoHelper);

console.log("[gBoards] API");

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => { res.send('Hello World'); });
app.use('/boards', boardRouter);
app.use('/lists', listRouter);

const port = 2909;
app.listen(port, () => {
  console.log(`[gBoards] Listening on Port: ${port}`);
});
