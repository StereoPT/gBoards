const mongodb = require('mongodb'),
      assert = require('assert');

function BoardHelper(router, mongoHelper) {
  const TABLE = 'Boards';

  function ListAllBoards(callback) {
    mongoHelper.Connect((client, db) => {
      let boardsTable = db.collection(TABLE);

      boardsTable.find({}).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  };

  function ListOneBoard(boardName, callback) {
    mongoHelper.Connect((client, db) => {
      let boardsTable = db.collection(TABLE);

      boardsTable.find({ "name": boardName }).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result[0]);

        client.close();
      });
    });
  };

  function AddBoard(boardToAdd, callback) {
    mongoHelper.Connect((client, db) => {
      let boardsTable = db.collection(TABLE);

      boardsTable.insertOne(boardToAdd, function(err, result) {
        assert.equal(err, null);
        callback(result.ops[0]);

        client.close();
      });
    });
  };

  function UpdateBoard(boardToUpdate, callback) {
    mongoHelper.Connect((client, db) => {
      let boardsTable = db.collection(TABLE);

      boardsTable.updateOne(
        { _id: new mongodb.ObjectID(boardToUpdate._id) },
        { $set: { name: boardToUpdate.name }}, function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  };

  function DeleteBoard(boardToDelete, callback) {
    mongoHelper.Connect((client, db) => {
      let boardsTable = db.collection(TABLE);

      boardsTable.deleteOne({ _id: new mongodb.ObjectID(boardToDelete) }, function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  };

  //***** ***** ***** ***** *****   BOARD ROUTES   ***** ***** ***** ***** *****//

  router.get('/', (req, res) => {
    ListAllBoards((result) => { res.send(result); });
  });

  router.get('/:name', (req, res) => {
    let boardName = req.params.name
    ListOneBoard(boardName, (result) => { res.send(result); });
  });

  router.post('/add', (req, res) => {
    let boardToAdd = req.body;
    AddBoard(boardToAdd, (result) => { res.send(result); });
  });

  router.put('/update', (req, res) => {
    let boardToUpdate = req.body;
    UpdateBoard(boardToUpdate, (result) => { res.send(result); });
  });

  router.delete('/delete/:id', (req, res) => {
    let boardToDelete = req.params.id;
    DeleteBoard(boardToDelete, (result) => { res.send(result); });
  });
}

module.exports = BoardHelper;
