var express = require('express');
var router = express.Router();
const userValidator = require('../middleware/validator/users.validator.v1');
const userControllers = require('../controllers/users.Controllers.v1');
const authMiddleware = require('../middleware/auth.middleware');

//users routes---------------
router.post('/users/register', register);
router.post('/users/authenticate', authenticate);
router.post('/users/profile', userValidator.getUserDetailsParamCheck(), userValidator.validate, getUserDetails);



//admin routes---------------------------
router.post('/admin/create_admin',authMiddleware.isAdmin, userValidator.createAdminParamCheck(), userValidator.validate, createAdmin);
router.post('/admin/users', authMiddleware.isAdmin, userValidator.createUserParamCheck(), userValidator.validate, createUser_c);
router.get('/admin/users', authMiddleware.isAdmin, userValidator.getUsersParamCheck(), userValidator.validate, getUsers_c);
router.put('/admin/users/:id', authMiddleware.isAdmin, userValidator.updateUserParamCheck(), userValidator.validate, updateUser);
router.delete('/admin/users/:id', authMiddleware.isAdmin, userValidator.deleteUserParamCheck(), userValidator.validate, deleteUser);



module.exports = router;


function authenticate(req, res) {
  req.body.userEmail = req.body.userEmail.trim();
  req.body.password = req.body.password.trim(); 
  userControllers.authenticate(req.body)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (err) {
      console.log(err);
      res.status(401).json(err);
    });
}






function register(req, res) {
        userControllers.create(req.body).then(function () {
             res.status(200).json({'status' : 'success', message:"User Created Successfully"});
         }).catch(function (err) {
             console.log(err);
             res.status(200).json({'status' : 'failure', 'error' : err});;
         });
      }
   
  





function getUserDetails(req, res) {
  userControllers.getuser(req.body)
  .then(function (user) {
    res.send(user);
  }).catch(function (err) {
    console.log(err);
    res.status(400).send(err);
  });
}




function createAdmin(req, res) {
  userControllers.createAdmin_in_controller(req.body)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (err) {
      res.status(400).json({ status: 'failure', error: err });
    });
}










function createUser_c(req, res) {
  userControllers.createUser_in_controller(req.body)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (err) {
      res.status(400).json({ status: 'failure', error: err });
    });
}

function getUsers_c(req, res) {
  const { page = 1, limit = 10, userName, userEmail, role } = req.query;
  userControllers.getUsers_in_controller(page, limit, userName, userEmail, role)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (err) {
      res.status(400).json({ status: 'failure', error: err });
    });
}

function updateUser(req, res) {
  userControllers.updateUser(req.params.id, req.body)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (err) {
      res.status(400).json({ status: 'failure', error: err });
    });
}

function deleteUser(req, res) {
  userControllers.deleteUser(req.params.id)
    .then(function (result) {
      res.status(200).json(result);
    })
    .catch(function (err) {
      res.status(400).json({ status: 'failure', error: err });
    });
}