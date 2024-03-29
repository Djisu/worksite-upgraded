/* eslint-disable semi */
const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route  POST api/users
// @desc   Test route
// @access Public
router.get('/', (req, res) => {
  console.log(req.body)
  res.send('User route')
})

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { name, email, password } = req.body

    try {
      // See if users exists
      let user = await User.findOne({ email: email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists ' }] })
      }

      // Get user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      })

      // Create new user instance
      user = new User({
        name,
        email,
        password,
        avatar,
      })

      // Encript password
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      await user.save()

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err

          res.json({ token })
        },
      )

      // res.send('User registered')
    } catch (err) {
      // eslint-disable-next-line
      console.log(err.message)
      // eslint-disable-next-line
      res.status(500).send('Server error')
    }
  },
)

module.exports = router
