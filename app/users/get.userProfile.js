const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const config = require('../../config.json');


function getUserP(param) {
  return new Promise((resolve, reject) => {
    const query = 
      { $or: [ { userEmail: param.userEmail }, { email: param.email } ] }
    

   
console.log(query)

    try {
      const client = new MongoClient(config.connectionString)
      client.connect();
      var db = client.db('users_db');
      db.collection('users_collection').find(query).toArray()
        .then((result) => {
          if (result.length > 0) {
            resolve(result);
          } else {
            let br = []
            resolve(br);
          }
       
        }).catch((err1) => {
          console.log(err1)
          reject(err1)
        });
        setTimeout(() => {
          client.close();
        }, config.mongoTimeout);


    } catch (err) {
      console.log(err)
      reject(err)
    }



  });
}




module.exports.getUserP = getUserP;