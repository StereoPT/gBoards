const MongoClient = require('mongodb').MongoClient,
      assert = require('assert');
const config = require('../config.json');

function MongoHelper() {
  var _client;
  let url = config.mongo_url;

  function Connect(callback) {
    MongoClient.connect(url, function(err, client) {
      _client = client
      let db = client.db('gBoards');

      assert.equal(null, err);
      callback(db);
    });
  }

  this.ListBoards = function(callback) {
    Connect((db) => {
      let boardsTable = db.collection('Boards');

      boardsTable.find({}).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result);

        _client.close();
      });
    });
  };

  this.ListBoard = function(boardID, callback) {
    Connect((db) => {
      let boardsTable = db.collection('Boards');

      boardsTable.find({ "id": boardID }).toArray(function(err, result) {
        assert.equal(err, null);
        callback(result[0]);

        _client.close();
      });
    });
  };

  this.AddBoard = function(boardToAdd, callback) {
    Connect((db) => {
      let boardsTable = db.collection('Boards');

      boardsTable.insertOne(boardToAdd, function(err, result) {
        assert.equal(err, null);
        callback(result.ops[0]);

        _client.close();
      });
    });
  };

  this.DeleteBoard = function(boardToDelete, callback) {
    Connect((db) => {
      let boardsTable = db.collection('Boards');

      boardsTable.deleteOne({ id: boardToDelete.id }, function(err, result) {
        assert.equal(err, null);
        console.log("Board Deleted with Success!");
        callback(result);

        _client.close();
      });
    });
  };
}

module.exports = MongoHelper;
