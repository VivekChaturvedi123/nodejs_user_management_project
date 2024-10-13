const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');

function isEmailUnique(userEmail) {
    return new Promise((resolve , reject) => {
        const query = {
            userEmail: userEmail,
        };
        try{
            var client = new MongoClient(config.connectionString);
                   client.connect();
                var db = client.db('users_db');
                     db.collection('users_collection').find(query).toArray()
                     .then((data) => {
                        if (data.length > 0) {
                            resolve({unique: false});
                        }
                        else {
                            resolve({unique: true});
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



module.exports.unique = isEmailUnique;
