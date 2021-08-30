import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Servicefees from '../models/servicefeesModel.js'
import { isAuth } from '../utils.js'
//import moment from 'moment'

const servicefeesRouter = express.Router()

servicefeesRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const servicefees = await Servicefees.find({})
    res.send(servicefees)
  }),
)

servicefeesRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
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
  }),
)

servicefeesRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in servicefeesRouter.delete()')
    const servicefees = await Servicefees.findOneAndDelete({
      id: req.params._id,
    })

    if (servicefees) {
      res.send(servicefees)
    } else {
      res.status(404).send({ message: 'Id not found' })
    }
  }),
)

servicefeesRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in servicefeesRouter.get(')

    const servicefees = await Servicefees.findById(req.params._id)

    if (servicefees) {
      res.send(servicefees)
    } else {
      res.status(404).send({ message: 'Service fees not found' })
    }
  }),
)

export default servicefeesRouter
