# GBoards Routes

## Boards

- **GET** `http://localhost:2909/boards` Will Display a List of Boards.
- **GET** `http://localhost:2909/boards/:id` Will Display the requested Board.
- **POST** `http://localhost:2909/boards/add` Will Add a Board.
- **PUT** `http://localhost:2909/boards/update` Will Update the Board.
- **DELETE** `http://localhost:2909/boards/delete/:id` Will Delete a Board.


## Lists

- **GET** `http://localhost:2909/lists/:id` Will Display the Lists for a requested Board.
- **POST** `http://localhost:2909/lists/add` Will Add a List.
- **PUT** `http://localhost:2909/lists/update` Will Update a List.
- **DELETE** `http://localhost:2909/lists/delete/:id` Will Delete a List.


## Cards

- **POST** `http://localhost:2909/lists/card/add` Will Add a Card.
- **PUT** `http://localhost:2909/lists/card/update` Will Update the Card.
- **POST** `http://localhost:2909/lists/card/delete/` Will Delete a Card.