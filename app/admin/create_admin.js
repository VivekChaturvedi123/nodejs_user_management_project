const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');
const md5 = require('md5');

function createAdmin(userData) {
  return new Promise((resolve, reject) => {
    const { name, email, password, role = 'admin' } = userData;
    const hashedPassword = md5(config.secret + password);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role,
      registrationDate: new Date()
    };

    try {
      const client = new MongoClient(config.connectionString);
      client.connect();
      const db = client.db('users_db');
      db.collection('users_collection').insertOne(newUser)
        .then((result) => {
          console.log("User created successfully");
          resolve({ status: 'success', message: 'Admin created successfully', userId: result.insertedId });
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

module.exports.createAdmin = createAdmin;