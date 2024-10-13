const MongoClient = require('mongodb').MongoClient;
const config = require('../../config.json');


function emailExists(userEmail) {
   
    return new Promise(function (resolve, reject) {
        const query = {
            userEmail: userEmail,
        };
        try {
            const client = new MongoClient(config.connectionString);
            client.connect();     
            const dbo = client.db('users_db');
            dbo.collection('users_collection').find(query).toArray()
                .then((result) => {
                    // if (result.length > 0) {
                        resolve(result);
                    // } else {
                    //     resolve("This email do not exists");
                    // }
                }).catch((error) => {
                    reject(error);
                });
                setTimeout(()=>{
                    client.close();
                  },config.mongoTimeout);
        } catch (error) {
            reject(error);
        }
    });
}

  



module.exports.emailExists = emailExists;

