const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const ServiceFees = require('../../models/ServiceFees')

// @route  POST api/servicefees
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('servicefees route'))

router.get('/', async (req, res) => {
  const servicefees = await Servicefees.find({})
  res.send(servicefees)
})

router.post('/', auth, async (req, res) => {
  console.log('in servicefeesRouter.post')

  if (!req.body) {
    res.status(400).send({ message: 'Service fees is empty' })
  } else {
    const servicefees = new Servicefees({
      serviceFees: req.body.serviceFees,
    })
    await Servicefees.remove({})
    const createdServicefees = await servicefees.save()

    console.log(
      'createdServicefees.servicefees==',
      createdServicefees.servicefees,
    ) // service: req.service._id,

    res.send(createdServicefees.servicefees)
  }
})

router.delete('/:id', async (req, res) => {
  console.log('in servicefeesRouter.delete()')
  const servicefees = await Servicefees.findOneAndREmove({
    id: req.params._id,
  })

  if (servicefees) {
    res.send(servicefees)
  } else {
    res.status(404).send({ message: 'Id not found' })
  }
})

router.get('/:id', async (req, res) => {
  console.log('in servicefeesRouter.get(')

  const servicefees = await Servicefees.findById(req.params._id)

  if (servicefees) {
    res.send(servicefees)
  } else {
    res.status(404).send({ message: 'Service fees not found' })
  }
})
module.exports = router
