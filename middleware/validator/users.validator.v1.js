const { body, query, param, validationResult } = require('express-validator');



function validate(req, res, next){
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(200).json({
    errors: extractedErrors,
    status:"failed"
  })
}

function getUserDetailsParamCheck(){
  return [
   body('userEmail').trim().isLength({min: 6}).withMessage('user email is needed to fetch data.')
  ]
}



function createUserParamCheck() {
  return [
    body('userName').notEmpty().withMessage('userName is required'),
    body('userEmail').isEmail().withMessage('Invalid userEmail'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
  ];
}



function createAdminParamCheck() {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
  ];
}



function getUsersParamCheck() {
  return [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('userName').optional().isString(),
    query('userEmail').optional().isEmail().withMessage('Invalid email'),
    query('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
  ];
}

function updateUserParamCheck() {
  return [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('userName').optional().notEmpty().withMessage('userName cannot be empty'),
    body('userEmail').optional().isEmail().withMessage('Invalid userEmail'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Invalid role')
  ];
}

function deleteUserParamCheck() {
  return [
    param('id').isMongoId().withMessage('Invalid user ID')
  ];
}











module.exports = {
  createAdminParamCheck,
  createUserParamCheck,
  getUsersParamCheck,
  updateUserParamCheck,
  deleteUserParamCheck,
  validate,
  getUserDetailsParamCheck,
}























