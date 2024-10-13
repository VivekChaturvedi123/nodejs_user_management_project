
const userControllers = require('../app/users/get.userProfile');

function isAdmin(req, res,next) {


 userControllers.getUserP(req.body)
.then(function (user) {
if(user.length > 0){
  return next()
}else{
  return res.status(403).json({ auth: false, message: 'Invalid Email' });

}
}).catch(function (err) {
  console.log(err);
   return res.status(403).json({ auth: false, message: 'Invalid token structure.' });
});
}

module.exports.isAdmin = isAdmin;






