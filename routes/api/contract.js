const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Contract = require('../../models/Contract')

const config = require('config')
const epw = config.get('emailPassword')

const User = require('../../models/User')

const nodemailer = require('nodemailer')

// @route  POST api/auth
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Contract route'))

// @route  GET api/contract/me
// @desc   Get current user contract
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const contract = await Contract.findOne({
      user: req.user.id,
    }).populate('contract', ['service', 'description']) //set user id from the token

    if (!contract) {
      return res.status(400).json({ msg: 'There is no contract for this user' })
    }

    res.json(contract)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST api/contract
// @desc   Create or update a user contract
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required').not().isEmpty(),
      check('completeDate', 'Completion Date is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('unitPrice', 'Unit Price is required').not().isEmpty(),
      check('totalCost', 'Total Cost is required').not().isEmpty(),
      check('service', 'Service is required').not().isEmpty(),
      check('isPaid', 'isPaid is required').not().isEmpty(),
      check('isCompleted', 'isCompleted is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    console.log('start')

    const user = await User.findOne({
      user: req.user.id,
    })

    console.log('user.email', user.email)

    const {
      contractId,
      transDate,
      completeDate,
      description,
      documents,
      comments,
      quantity,
      unitPrice,
      totalCost,
      isPaid,
      isCompleted,
      service,
      email,
      telno,
      serviceEmail,
      image,
    } = req.body

    // Build profile object
    // console.log('isPaid', isPaid)
    // console.log('isCompleted', isCompleted)
    const contractFields = {}

    contractFields.user = req.user.id

    if (contractId) contractFields.contractId = contractId
    if (transDate) contractFields.transDate = transDate
    if (completeDate) contractFields.completeDate = completeDate
    if (description) contractFields.description = description
    if (documents) {
      contractFields.documents = documents
        .split(',')
        .map((document) => document.trim())
    }
    if (comments) contractFields.comments = comments
    if (quantity) contractFields.quantity = quantity
    if (unitPrice) contractFields.unitPrice = unitPrice
    if (totalCost) contractFields.totalCost = totalCost
    if (isPaid) contractFields.isPaid = isPaid
    if (isCompleted) contractFields.isCompleted = isCompleted
    if (service) contractFields.service = service
    if (email) contractFields.email = email
    if (telno) contractFields.telno = telno
    if (serviceEmail) contractFields.serviceEmail = serviceEmail
    if (image) contractFields.image = image

    try {
      // let contract = await Contract.findOne({ _id: req.contract.id })
      let contract = await Contract.findById(req.contractId)

      if (contract) {
        // Update old contract findById(id)
        contract = await Contract.findOneAndUpdate(
          { contract: req.contract._id },
          { $set: contractFields },
          { new: true },
        )
        return res.json(contract)
      }
      console.log('about to Create new contract')

      // console.log('contractFields.isPaid', contractFields.isPaid)
      // console.log('contractFields.isCompleted', contractFields.isCompleted)

      // Create new contract  var userID=uuid();
      contractFields.contractId = uuid()
      contract = new Contract(contractFields)
      await contract.save()

      NODE_TLS_REJECT_UNAUTHORIZED = '0'

      //Email sending
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'djesudjoleto@gmail.com',
          pass: 'kijwikopmbypvyxj',
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
      const mailOptions = {
        from: 'djesudjoleto@gmail.com', // sender address
        to: 'pfleischer2002@yahoo.co.uk', // list of receivers
        subject: 'Contract confirmed', // Subject line
        html: '<p>This is to inform you that your work will be done.</p>', // plain text body
      }
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err)
        else console.log(info)
      })

      //End of Email

      return res.json(contract)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error ooooooo')
    }
  },
)

router.get('/:email', async (req, res) => {
  const contract = await Contract.find({ email: req.params.email })

  if (contract) {
    res.send(contract)
  } else {
    res.status(404).send({ message: 'Contract Not Found' })
  }
})

// Delete contract after expiration of contract.
router.delete('/:id', async (req, res) => {
  console.log('in contractRouter.delete()', req.params.id)
  const contractid = req.params.id

  try {
    const contract = await Contract.findOneAndRemove({ contractId: contractid })
    res.send('Contract deleted')
  } catch (error) {
    res.status(404).send({ message: 'Contract Not Found' })
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
