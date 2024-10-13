const user = require('../app/users/save_user');
const Q = require('q');
const config = require('../config.json');
const md5 = require('md5');
const jwt = require('jsonwebtoken');







const checkUnique = require('../app/users/check.unique.user');
const checkEmail = require('../app/users/check.email.exists');
const getUserProfile = require('../app/users/get.userProfile');
const getUserProfileThroughEmailId = require('../app/users/get.userProfileThroughEmailId');


const createAdmin_c = require('../app/admin/create_admin');

const createUser_c = require('../app/admin/create_user');
const getUsers_c = require('../app/admin/get_users');
const updateUserDetails = require('../app/admin/update_userDetails');
const deleteUserById = require('../app/admin/delete_user');



function createAdmin_in_controller(userData) {
  let defer = Q.defer();
  createAdmin_c.createAdmin(userData)
    .then((result) => {
      defer.resolve(result);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
}








function createUser_in_controller(userData) {
  let defer = Q.defer();
  createUser_c.create(userData)
    .then((result) => {
      defer.resolve(result);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
}

function getUsers_in_controller(page, limit, userName, userEmail, role) {
  let defer = Q.defer();
  getUsers_c.get(page, limit, userName, userEmail, role)
    .then((result) => {
      defer.resolve(result);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
}

function updateUser(userId, userData) {
  let defer = Q.defer();
  updateUserDetails.update(userId, userData)
    .then((result) => {
      defer.resolve(result);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
}

function deleteUser(userId) {
  let defer = Q.defer();
  deleteUserById.delete(userId)
    .then((result) => {
      defer.resolve(result);
    })
    .catch((e) => {
      defer.reject(e);
    });
  return defer.promise;
}






function create(userData) {
  let defer = Q.defer();
  checkUnique.unique(userData.userEmail).then((uniq) => {
    if (uniq.unique) {
      createUser(userData)
      .then((accountReady) => {
        defer.resolve(accountReady);
      }).catch((e1) => {
        console.log(e1);
        defer.reject(e1.name + ' ' + e1.code);
      });
    }
    else {
      console.log('Not Unique');
      defer.reject('11000');
    }
  }).catch((e) => {
    console.log(e);
    defer.reject(e.name + ' ' + e.code);
  });
  return defer.promise;
}

function createUser(userData) {
  let defer = Q.defer();
  var password = md5(config.secret + userData.password);
  // var date = new Date();
  // var month = ("0" + (date.getMonth() + 1)).slice(-2);
  // var day = ("0" + date.getDate()).slice(-2);
  // var year = date.getUTCFullYear();
  // var registrationDate = day + "-" + month + "-" + year;
  user.save(userData, password)
  .then((res) => {
    console.log(res)
    defer.resolve(res)
  }).catch((e) => {
    console.log(e)
    defer.reject(e.name + ' ' + e.code);
  });
  return defer.promise;
}


function authenticate(userData) {
  let defer = Q.defer();
  checkEmail.emailExists(userData.userEmail)
    .then((users) => {
      if (users && users.length > 0) {
        const user = users[0];
        checkCredentials(user, userData)
          .then((loginSuccess) => {
            defer.resolve(loginSuccess);
          }).catch((e1) => {
            console.log(e1);
            defer.reject(e1);
          });
      } else {
        defer.reject({ status: "failure", message: "Email ID Is Not Registered" });
      }
    }).catch((e) => {
      console.log(e);
      defer.reject({ status: "failure", message: "Error checking email" });
    });
  return defer.promise;
}

function checkCredentials(user, userData) {
  let defer = Q.defer();
  const password = md5(config.secret + userData.password);
  
  if (password === user.password) {
    const token = jwt.sign(
      { 
        id: user._id, 
        role: user.role 
      }, 
      config.secret,
      { expiresIn: '24h' }
    );

    const rObj = {
      _id: user._id,
      userEmail: user.userEmail,
      userName: user.userName,
      role: user.role,
      token: token
    };

    const salt = randomString(16);
    const encryptedRetr = _cncEncrypt(salt, rObj);
    defer.resolve({ status: "success", currentUser: encryptedRetr });
  } else {
    defer.reject({ status: "failed", message: "Password Is Not Correct" });
  }
  
  return defer.promise;
}



function getuser(param) {
  let defer = Q.defer();
  getUserProfile.getUserP(param).then((res) => {
      defer.resolve(res);
  }).catch((e) => {
      defer.reject(e.name + ' ' + e.code);
  });
  return defer.promise;
}





function getuserByEmail(userEmail) {
  let defer = Q.defer();
  getUserProfileThroughEmailId.getUserP(userEmail)
  .then((res) => {
      defer.resolve(res);
  }).catch((e) => {
      defer.reject(e.name + ' ' + e.code);
  });
  return defer.promise;
}




function setProfileData(user){
    let defer = Q.defer();
  setUserProfile.saveProfile(user).then((res) => {
    console.log(res)
      defer.resolve(res);
  }).catch((e) => {
      defer.reject(e.name + ' ' + e.code);
  });
  return defer.promise;
}



function makeVerifyCode(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



function _cncEncrypt(salt, userObj){
  const cryptoAES = require('crypto-js/aes');
  var ciphertext = cryptoAES.encrypt(JSON.stringify(userObj), salt).toString();
  var ctWithSlat = salt+ciphertext;
  return ctWithSlat;
}






module.exports.create = create;
module.exports.authenticate = authenticate;
module.exports.getuser =getuser;
module.exports.setProfileData= setProfileData;
module.exports.getuserByEmail = getuserByEmail;









module.exports.createAdmin_in_controller = createAdmin_in_controller;
module.exports.createUser_in_controller = createUser_in_controller;
module.exports.getUsers_in_controller = getUsers_in_controller;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;




























