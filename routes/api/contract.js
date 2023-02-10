const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Contract = require('../../models/Contract')

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
      user: req.contract.id,
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
      check('service', 'Service is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
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
    const contractFields = {}

    contractFields.user = req.user.id

    if (transDate) contractFields.transDate = transDate
    if (completeDate) contractFields.completeDate = completeDate
    if (description) contractFields.description = description
    if (documents) {
      contractFields.documents = document
        .split(',')
        .map((document) => skill.trim())
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
      let contract = await Contract.findOne({ contract: req.contract._id })

      if (contract) {
        // Update old contract
        contract = await Contract.findOneAndUpdate(
          { contract: req.contract._id },
          { $set: contractFields },
          { new: true },
        )
        return res.json(contract)
      }

      // Create new contract
      contract = new Contract(contractFields)
      await contract.save()

      //Email sending
      var transporter = nodemailer.createTransport({
        /* service: 'gmail', */
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: user,
          pass: pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      var mailOptions = {
        from: user,
        to: req.body.serviceEmail,
        subject: 'Contract from ' + req.body.email,
        text: req.body.description,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
      //End of Email

      return res.json(contract)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

router.put(
  '/:id',
  [
    auth,
    [
      check('description', 'Description is required').not().isEmpty(),
      check('completeDate', 'Completion Date is required').not().isEmpty(),
      check('quantity', 'Quantity is required').not().isEmpty(),
      check('unitPrice', 'Unit Price is required').not().isEmpty(),
      check('service', 'Service is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    console.log('contract.put', req.params._id)
    const contractid = req.params._id

    const contract = await Contract.findById(contractid)

    if (contract) {
      contract.user = req.body.user
      contract.transDate = req.body.transDate
      contract.completeDate = req.body.completeDate
      contract.description = req.body.description
      contract.documents = req.body.documents
      contract.comments = req.body.comments
      contract.quantity = req.body.quantity
      contract.unitPrice = req.body.unitPrice
      contract.totalCost = req.body.totalCost
      contract.isPaid = req.body.isPaid
      contract.isCompleted = req.body.isCompleted
      contract.service = req.body.service
      contract.email = req.body.email
      contract.telno = req.body.telno
      contract.serviceEmail = req.body.serviceEmail

      const updatedContract = await contract.save()
      res.send({
        message: 'Contract Updated',
        contract: updatedContract,
      })
    } else {
      res.status(404).send({ message: 'Contract Not Found' })
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

router.delete('/:id', async (req, res) => {
  console.log('in contractRouter.delete()', req.params.id)
  const contractid = req.params.id

  const contract = await Contract.deleteOne({ _id: contractid })

  if (contract) {
    res.send(contract)
  } else {
    res.status(404).send({ message: 'Contract Not Found' })
  }
})

module.exports = router
