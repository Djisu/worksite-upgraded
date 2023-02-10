const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Service = require('../../models/Service')

// @route  POST api/service
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Service route'))

// @route  GET api/contract/me
// @desc   Get current user contract
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const service = await Service.findOne({
      service: req.service._id,
    }).populate('service', ['name', 'description'])

    if (!service) {
      return res.status(400).json({ msg: 'Service not found' })
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
      check('category', 'Category is required').not().isEmpty(),
      check('name', 'Name is required').not().isEmpty(),
      check('unitPrice', 'Unit Price is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('transDate', 'Transaction Date is required').not().isEmpty(),
      check('endDate', 'End Date is required').not().isEmpty(),
      check('serviceFees', 'Service Fees is required').not().isEmpty(),
      check('units', 'Unitsis required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      category,
      name,
      image,
      unitPrice,
      rating,
      numReviews,
      description,
      transDate,
      endDate,
      serviceFees,
      units,
    } = req.body

    // Build profile object
    const serviceFields = {}
    serviceFields.user = req.user.id

    if (category) serviceFields.category = category
    if (name) serviceFields.name = name
    if (image) serviceFields.image - image
    if (unitPrice) serviceFields.unitPrice = unitPrice
    if (rating) serviceFields.rating = rating
    if (numReviews) serviceFields.numReviews = numReviews
    if (description) serviceFields.description = description
    if (transDate) serviceFields.transDate = transDate
    if (endDate) serviceFields.endDate = endDate
    if (serviceFees) serviceFields.serviceFees = serviceFees
    if (units) serviceFields.units = units

    try {
      let service = await Service.findOne({ service: req.service.id })

      if (service) {
        // Update old service
        service = await Service.findOneAndUpdate(
          { service: req.service.id },
          { $set: serviceFields },
          { new: true },
        )
        return res.json(service)
      }

      // Create new contract
      service = new Service(serviceFields)
      await service.save()

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
        subject: 'Service from ' + req.body.email,
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

      return res.json(service)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route  GET api/profile/user/:user_id
// @desc   GET profile by user ID
// @access Public
// router.get('/user/:user_id', async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.params.user_id,
//     }).populate('user', ['name', 'avatar'])

//     if (!profile) return res.status(400).json({ msg: 'Profile not found' })

//     res.json(profile)
//   } catch (err) {
//     console.error(err.message)

//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'Profile not found' })
//     }
//     res.status(500).send('Server Error')
//   }
// })

// @route  GET api/service/:id
// @desc   GET service by service ID
// @access Public
router.get('/:email', async (req, res) => {
  console.log('service router.get')

  console.log('const service = await Service.find')

  const service = await Service.find({
    email: req.params.email,
    endDate: { $gt: new Date() },
  })

  console.log('serviceRouter.get service ==', service)

  if (service) {
    res.send(service)
  } else {
    res.status(404).send({ message: 'Service Not Found' })
  }
})

router.get('/:id', async (req, res) => {
  console.log('in serviceRouter.get(')

  const service = await Service.findById(req.params.id)

  if (service) {
    res.send(service)
  } else {
    res.status(404).send({ message: 'Service not found' })
  }
})

router.post('/:id/reviews', auth, async (req, res) => {
  const serviceId = req.params.id
  const service = await Service.findById(serviceId)

  if (service) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    }

    service.reviews.push(review)
    service.numReviews = service.reviews.length
    service.rating =
      service.reviews.reduce((a, c) => c.rating + a, 0) / service.reviews.length

    const updatedService = await service.save()
    res.status(201).send({
      message: 'Review Created',
      review: updatedService.reviews[updatedService.reviews.length - 1],
    })
  } else {
    res.status(404).send({ message: 'Service Not Found' })
  }
})

module.exports = router
