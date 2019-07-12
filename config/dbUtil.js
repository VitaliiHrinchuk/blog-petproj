const MongoClient = require('mongodb').MongoClient;
const config = require('./db');

let connection;

module.exports = {
  connectionToServer() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(
        config.URL,
        { useNewUrlParser: true },
        (err, client) => {
          if (err) reject(err);
          connection = client.db(config.DB_NAME);
          // client.close();
          resolve(connection);
        }
      );
    });
  },
  getConnection() {
    return connection;
  }
};
