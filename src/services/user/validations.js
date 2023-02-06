const { body } = require('express-validator')

exports.validationSignUp = [
  body('name')
    .isString()
    .withMessage('name must be string!')
    .isAlpha()
    .withMessage('name must be alphabet!')
    .notEmpty()
    .withMessage('name is required!'),

  body('email')
    .isEmail()
    .withMessage('email not valid!')
    .notEmpty()
    .withMessage('alamat is required!'),

  body('password')
    .isStrongPassword()
    .withMessage('password not valid!')
    .notEmpty()
    .withMessage('password is required!')
]

exports.validationSignIn = [
  body('email')
    .isEmail()
    .withMessage('email not valid!')
    .notEmpty()
    .withMessage('alamat is required!'),

  body('password')
    .isStrongPassword()
    .withMessage('password not valid!')
    .notEmpty()
    .withMessage('password is required!')
]
