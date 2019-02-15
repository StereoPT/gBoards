const mongodb = require('mongodb'),
      assert = require('assert');

function ListHelper(router, mongoHelper) {
  const TABLE = 'Lists';

  function ListBoardLists(boardID, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.find({ boardID: new mongodb.ObjectID(boardID) }).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  }

  function AddList(listToAdd, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.insertOne(listToAdd, function(err, result) {
        assert.equal(err, null);
        callback(result.ops[0]);

        client.close();
      });
    });
  };

  function UpdateList(listToUpdate, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.updateOne(
        { _id: new mongodb.ObjectID(listToUpdate._id) },
        { $set: { name: listToUpdate.name }}, function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  };

  function DeleteList(listToDelete, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.deleteOne({ _id: new mongodb.ObjectID(listToDelete) }, function(err, result) {
        assert.equal(err, null);
        callback(result);

        client.close();
      });
    });
  };

  function AddCard(cardToAdd, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.updateOne(
        { _id: new mongodb.ObjectID(cardToAdd.listID) },
        { $push: { cards: cardToAdd.card.text }}, function(err, result) {
        assert.equal(err, null);
        callback(cardToAdd.card);

        client.close();
      });
    });
  };

  function UpdateCard(cardToUpdate, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.updateOne(
        { _id: new mongodb.ObjectID(cardToUpdate.listID), cards: cardToUpdate.cardLastName },
        { $set: { "cards.$": cardToUpdate.card.text }}, function(err, result) {
          assert.equal(err, null);
          callback(result);

          client.close();
        });
    });
  };

  function DeleteCard(cardToDelete, callback) {
    mongoHelper.Connect((client, db) => {
      let listsTable = db.collection(TABLE);

      listsTable.updateOne(
        { _id: new mongodb.ObjectID(cardToDelete.listID) },
        { $pull: { cards: cardToDelete.card.text }}, function(err, result) {
        assert.equal(err, null);
        callback(cardToDelete.card);

        client.close();
      });
    });
  };

  //***** ***** ***** ***** *****   LIST ROUTES   ***** ***** ***** ***** *****//

  router.get('/:id', (req, res) => {
    let boardID = req.params.id.trim();
    ListBoardLists(boardID, (result) => { res.send(result); });
  });

  router.post('/add', (req, res) => {
    let listToAdd = req.body;
    listToAdd.boardID = new mongodb.ObjectID(listToAdd.boardID);
    AddList(listToAdd, (result) => { res.send(result); });
  });

  router.put('/update', (req, res) => {
    let listToUpdate = req.body;
    UpdateList(listToUpdate, (result) => { res.send(result); });
  });

  router.delete('/delete/:id', (req, res) => {
    let listToDelete = req.params.id;
    DeleteList(listToDelete, (result) => { res.send(result); });
  });

  router.post('/card/add', (req, res) => {
    let cardToAdd = req.body;
    AddCard(cardToAdd, (result) => { res.send(result); });
  });

  router.put('/card/update', (req, res) => {
    let cardToUpdate = req.body;
    UpdateCard(cardToUpdate, (result) => { res.send(result); });
  });

  router.post('/card/delete', (req, res) => {
    let cardToDelete = req.body;
    DeleteCard(cardToDelete, (result) => { res.send(result); });
  });
}

module.exports = ListHelper;
