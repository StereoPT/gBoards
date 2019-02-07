const mongodb = require('mongodb'),
      MongoClient = mongodb.MongoClient,
      assert = require('assert');
const config = require('../config.json');

function MongoHelper() {
  let url = config.mongo_url;
  const DATABASE = config.database;

  this.Connect = function(callback) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      let db = client.db(DATABASE);

      assert.equal(null, err);
      callback(client, db);
    });
  }
}

module.exports = MongoHelper;
