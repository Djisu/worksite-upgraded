const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Service = require('../../models/Service')
const nodemailer = require('nodemailer')

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
      check('units', 'Units is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      serviceId,
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
      location,
    } = req.body

    // Build profile object
    const serviceFields = {}
    serviceFields.user = req.user.id

    if (serviceId) serviceFields.serviceId = serviceId
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
    if (location) serviceFields.location = location

    try {
      // let service = await Service.findOne({
      //   service: req.serviceId,
      // })
      let service = await Service.findById(req.serviceId)

      if (service) {
        console.log('update')
        // Update old service
        service = await Service.findOneAndUpdate(
          { service: req.serviceId },
          { $set: serviceFields },
          { new: true },
        )
        return res.json(service)
      }

      // Create new contract
      let kofi = uuid()

      console.log('kofi', kofi)
      if (!kofi) {
        return res.send('empty uuid')
      }

      serviceFields.serviceId = uuid()
      // paymentFields.paymentId = uuid()
      service = new Service(serviceFields)
      await service.save()

      // //Email sending
      // var transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   host: 'smtp.gmail.com',
      //   port: 587,
      //   secure: false, // true for 465, false for other ports
      //   auth: {
      //     user: 'djesudjoleto@gmail.com',
      //     pass: 'kijwikopmbypvyxj',
      //   },
      //   tls: {
      //     rejectUnauthorized: false,
      //   },
      // })
      // const mailOptions = {
      //   from: 'djesudjoleto@gmail.com', // sender address
      //   to: 'pfleischer2002@yahoo.co.uk', // list of receivers
      //   subject: 'Service created', // Subject line
      //   html: '<p>This is to inform you that your service is created.</p>', // plain text body
      // }
      // transporter.sendMail(mailOptions, function (err, info) {
      //   if (err) console.log(err)
      //   else console.log(info)
      // })

      // //End of Email

      return res.json(service)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

// @route  GET api/service/:id
// @desc   GET service by service ID
// @access Public
router.get('/:id', async (req, res) => {
  console.log('service router.get')

  console.log('const service = await Service.find')

  const service = await Service.find({
    email: req.params.id,
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

  console.log('serviceId: ', serviceId)
  // const service = await Service.findById(serviceId)

  const service = await Service.findOne({
    service: req.params.id,
  })

  if (service) {
    const review = {
      name: req.body.name,
      comment: req.body.comment,
      rating: Number(req.body.rating),
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

function uuid() {
  console.log('in uuid')
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

module.exports = router
