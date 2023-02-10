const jwt = require('jsonwebtoken')
const config = require('config') //We will need the secret

module.exports = function (req, res, next) {
  // Get token fron the header
  const token = req.header('x-auth-token')

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // if token then Verify token
  try {
    // Decode the token.
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    // Set req object to decoded user
    req.user = decoded.user

    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
