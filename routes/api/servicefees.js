const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const ServiceFees = require('../../models/ServiceFees')
const User = require('../../models/User')

// @route  POST api/servicefees
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('servicefees route'))

router.get('/', async (req, res) => {
  const servicefees = await Servicefees.find({})
  res.send(servicefees)
})

router.post(
  '/',
  [auth, [check('servicefees', 'Service fees is required').not().isEmpty()]],
  async (req, res) => {
    console.log('in servicefeesRouter.post')

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { user, servicefees } = req.body

    // console.log('user, servicefees:', user, servicefees)

    let servicefeesFields = {}
    servicefeesFields.user = user //req.user.id
    servicefeesFields.servicefees = servicefees

    // console.log('1')
    try {
      let servicefees = await ServiceFees.findOne({ user: req.user.id })

      if (servicefees) {
        // Update
        servicefees = await ServiceFees.findOneAndUpdate(
          { user: req.user.id },
          { $set: servicefeesFields },
          { new: true },
        )
        return res.json(servicefees)
      }

      // console.log('2')
      // Create new profile
      servicefees = new ServiceFees(servicefeesFields)

      await servicefees.save()
      return res.json(servicefees)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  },
)

router.delete('/:id', async (req, res) => {
  console.log('in servicefeesRouter.delete()')

  const servicefees = await Servicefees.findOneAndRemove({
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
