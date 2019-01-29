const express = require('express'),
      cors = require('cors');
const app = express();
const port = 2909;

console.log("[gBoards] API");

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

let boards = [
  { id: 1, name: 'ToDo' },
  { id: 2, name: 'Pixel Javelin' },
  { id: 3, name: 'Rainy Day' },
  { id: 4, name: 'gBoard' },
];

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/boards', (req, res) => {
  res.send(boards);
});

app.listen(port, () => {
  console.log(`[gBoards] Listening on Port: ${port}`);
});
