const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');
const ObjectId = require('mongodb').ObjectId;

function updateUserDetails(userId, userData) {
  return new Promise((resolve, reject) => {
    const { userName, UserEmail, role } = userData;
    const updateData = { userName, UserEmail, role };

    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      
      db.collection('users_collection').updateOne(
        { _id: new ObjectId(userId) },
        { $set: updateData }
      )
        .then((result) => {
          if (result.matchedCount === 0) {
            reject({ status: 'failure', message: 'User not found' });
          } else {
            resolve({ status: 'success', message: 'User updated successfully' });
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

module.exports.update = updateUserDetails;