const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');
const ObjectId = require('mongodb').ObjectId;

function deleteUser(userId) {
  return new Promise((resolve, reject) => {
    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      
      db.collection('users_collection').deleteOne({ _id: new ObjectId(userId) })
        .then((result) => {
          if (result.deletedCount === 0) {
            reject({ status: 'failure', message: 'User not found' });
          } else {
            resolve({ status: 'success', message: 'User deleted successfully' });
          }
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

module.exports.delete = deleteUser;