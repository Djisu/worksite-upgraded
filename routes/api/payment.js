const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Payment = require('../../models/Payment')
const User = require('../../models/User')

// // @route  POST api/profile
// // @desc   Test route
// // @access Public
// router.get('/', (req, res) => res.send('payment route'))

// @route  GET api/payment/me
// @desc   Get current user payments
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const payment = await Payment.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar'])

    if (!payment) {
      return res.status(400).json({ msg: 'There is no payment for this user' })
    }

    res.json(payment)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/payment
// @desc   Create or update a user payment
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('user', 'User is required').not().isEmpty(),
      check('amount', 'Amount is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { paymentId, transDate, description, amount } = req.body

    // Build payment object
    const paymentFields = {}

    paymentFields.user = req.user.id
    if (paymentId) paymentFields.paymentId = paymentId
    if (transDate) paymentFields.transDate = transDate
    if (description) paymentFields.description = description
    if (amount) paymentFields.amount = amount

    try {
      let payment = await Payment.findById(req.paymentId)

      if (payment) {
        // Update
        payment = await Payment.findOneAndUpdate(
          { user: req.user.id },
          { $set: paymentFields },
          { new: true },
        )
        return res.json(payment)
      }

      // Create new profile
      paymentFields.paymentId = uuid()
      payment = new Payment(paymentFields)

      await payment.save()
      return res.json(payment)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route  GET api/payment
// @desc   GET all payments
// @access Public
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find() //.populate('user', ['name', 'avatar'])
    if (payments) {
      return res.json(payments)
    }

    res.status(401).send({ msg: 'Payments not found' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  GET api/payment/:user_id
// @desc   GET profile by user ID
// @access Public
router.get('/:user_id', async (req, res) => {
  console.log('in get payment')
  try {
    const payment = await Payment.find({
      user: req.params.user_id,
    }) //.populate('user', ['name', 'avatar'])

    if (!payment) return res.status(400).json({ msg: 'Payment not found' })

    res.json(payment)
  } catch (err) {
    console.error(err.message)

    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Payment not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route  DELETE api/payments
// @desc   Delete payments
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // @todo - remove users posts

    const uid = req.user.id
    console.log('uid: ', uid)

    // Remove user
    await Payment.deleteMany({ user: req.user.id })
    res.json({ msg: 'All payments deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

module.exports = router
