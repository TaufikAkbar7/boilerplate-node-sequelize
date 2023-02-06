const jsonwebtoken = require('jsonwebtoken')
const { APP_TOKEN_SECRET } = require('./env')

exports.generateToken = user =>
  jsonwebtoken.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email
    },
    APP_TOKEN_SECRET,
    {
      expiresIn: 86400
    }
  )
