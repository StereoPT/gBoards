# GBoards

![gBoards](https://raw.githubusercontent.com/StereoPT/gBoards/master/screens/gBoards_011.jpg)

## ToDo List

- [x] ReDo Add Board in Board Grid
- [x] ReDo Edit / Update Boards
- [x] New ReadMe.md
- [x] BackEnd Code Cleanup
- [x] Create Board Component
- [x] Route from Boards to Board
- [ ] Create List Component

## Development Server

### FrontEnd

Angular Application for FrontEnd. (inside 'frontend' folder)

Run with `ng serve --open`.

Will open the Applcation in your Browser. If it doesn't navigate to `http://localhost:4200/`.


### BackEnd

Node.js Application for BackEnd. (inside 'backend' folder)

Run with `nodemon app.js`.

#### Backend Routes

- GET `http://localhost:2909/boards` Will Display a List of Boards.
- GET `http://localhost:2909/boards/:boardID` Will Display the Requested Board.

- POST `http://localhost:2909/boards/add` Will Add a Board.
- PUT `http://localhost:2909/boards/update` Will Update the Board.
- DELETE `http://localhost:2909/boards/delete` Will Delete a Board.
