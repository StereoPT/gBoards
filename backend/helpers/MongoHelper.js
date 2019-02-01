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
}

module.exports = MongoHelper;
