const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');
const md5 = require('md5');

function createUser(userData) {
  return new Promise((resolve, reject) => {
    const { userName, userEmail, password, role } = userData;
    const hashedPassword = md5(config.secret + password);
    const newUser = {
      userName,
      userEmail,
      password: hashedPassword,
      role,
      registrationDate: new Date()
    };
console.log(newUser,"-----------------------------")
    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      db.collection('users_collection').insertOne(newUser)
        .then((result) => {
          console.log("User created successfully");
          resolve({ status: 'success', message: 'User created successfully', userId: result.insertedId });
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

module.exports.create = createUser;