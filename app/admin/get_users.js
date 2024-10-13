const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');

function getUsers(page, limit,userName, userEmail, role) {
  return new Promise((resolve, reject) => {
    const query = {};
    if (userName) query.userName = new RegExp(userName, 'i');
    if (userEmail) query.userEmail = new RegExp(userEmail, 'i');
    if (role) query.role = role;

    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      const skip = (page - 1) * limit;

      db.collection('users_collection').find(query).skip(skip).limit(parseInt(limit))
        .toArray()
        .then((users) => {
          db.collection('users_collection').countDocuments(query)
            .then((total) => {
              resolve({
                users,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalUsers: total
              });
            });
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

module.exports.get = getUsers;