const MongoClient = require('mongodb').MongoClient;
const config = require('../config.json');

function fetchRecentUsers() {
  return new Promise((resolve, reject) => {
    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      db.collection('users_collection').find({
        registrationDate: { $gte: sevenDaysAgo }
      }).toArray()
        .then((users) => {
          resolve(users);
        })
        .catch((err) => {
          reject(err);
        });

      setTimeout(() => {
        client.close();
      }, config.mongoTimeout);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = fetchRecentUsers;