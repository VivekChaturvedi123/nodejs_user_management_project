const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');


function saveUser(userData, password) {
  return new Promise((resolve, reject) => {
    const toUpdate = {
        userName: userData.userName,
        password: password,
        userEmail: userData.userEmail,
        registrationDate: new Date()
    };
    try {
      var client = new MongoClient(config.connectionString);
      client.connect();
      var db = client.db('users_db');
      db.collection('users_collection').insertOne(toUpdate)
        .then((updated) => {
          console.log("User Added Successfully")
          resolve(updated);
        }).catch((err) => {
          reject(err)
        });
      setTimeout(() => {
        client.close();
      }, config.mongoTimeout);
    } catch (err) {
      reject(err)
    }
  });
}


module.exports.save = saveUser;
