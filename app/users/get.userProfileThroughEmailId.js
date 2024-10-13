const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');
const config = require('../../config.json');


function getUserP(email) {
    return new Promise((resolve , reject) => {
        const query = {
            email: email
        };
        try{
            var client = new MongoClient(config.connectionString);
                   client.connect();
                var db = client.db('users_db');
                     db.collection('users_collection').find(query).toArray()
                     .then((result) => {
                        if (result.length > 0) {
                            resolve(result);
                        }
                        else {
                        let br =[]
                        resolve(br);  
                        }                     
                      }).catch((err) => {
                           reject(err)
                       });
     
                       setTimeout(()=>{
                        client.close();
                      },config.mongoTimeout);
                    } catch(err){
                      reject(err)
                   }  
                   
          
    });
}




module.exports.getUserP = getUserP;
