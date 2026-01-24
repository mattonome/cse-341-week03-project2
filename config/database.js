const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('DB already initialized');
    return callback(null, database);
  }

  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    return callback(new Error('MONGODB_URL is not defined in .env'));
  }

  MongoClient.connect(mongoUrl)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };
