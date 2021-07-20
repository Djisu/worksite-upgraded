import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Service from '../models/serviceModel.js'
import { isAuth } from '../utils.js'

const serviceRouter = express.Router()

serviceRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    // console.log('in get')
    const services = await Service.find({})
    // console.log('services============', services)
    res.send(services)
  }),
)

serviceRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //console.log('data==', data)
    await Service.remove({})
    const createdServices = await Service.insertMany(data.services)
    res.send({ createdServices })
  }),
)

serviceRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.post')

    if (!req.body) {
      res.status(400).send({ message: 'Service is empty' })
    } else {
      const service = new Service({
        category: req.body.category,
        email: req.body.email,
        name: req.body.name,
        image: req.body.image,
        unitPrice: req.body.unitPrice,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        description: req.body.description,
        telno: req.body.telno,
        delay: req.body.delay,
        transDate: req.body.transDate,
        expireDate: req.body.expireDate,
        serviceFees: req.body.serviceFees,
      })
      //await Service.remove({})
      const createdServices = await service.save()

      console.log('createdServices==', createdServices)
      res.status(201).send({
        _id: createdServices._id,
        category: createdServices.category,
        email: createdServices.email,
        name: createdServices.name,
        image: createdServices.image,
        unitPrice: createdServices.unitPrice,
        rating: createdServices.rating,
        numReviews: createdServices.numReviews,
        description: createdServices.description,
        telno: createdServices.telno,
        delay: createdServices.delay,
        transDate: createdServices.transDate,
        expireDate: createdServices.expireDate,
        serviceFees: createdServices.serviceFees,
      })
    }
  }),
)

serviceRouter.put(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.put')

    if (!req.body) {
      res.status(400).send({ message: 'Service is empty' })
    }

    const service = await Service.find({ email: req.params._id })

    if (service) {
      ;(service.category = req.params.category),
        (service.email = req.params.email),
        (service.name = req.params.name),
        (service.image = req.params.image),
        (service.unitPrice = req.params.unitPrice),
        (service.rating = req.params.rating),
        (service.numReviews = req.params.numReviews),
        (service.description = req.params.description),
        (service.telno = req.params.telno),
        (service.delay = req.params.delay),
        (service.transDate = req.params.transDate),
        (service.expireDate = req.params.expireDate),
        (service.serviceFees = req.params.serviceFees)

      //await Service.remove({})
      const updatedService = await service.save()

      console.log('updatedService==', updatedService)

      res.status(201).send({
        _id: updatedService._id,
        category: updatedService.category,
        email: updatedService.email,
        name: updatedService.name,
        image: updatedService.image,
        unitPrice: updatedService.unitPrice,
        rating: updatedService.rating,
        numReviews: updatedService.numReviews,
        description: updatedService.description,
        telno: updatedService.telno,
        delay: updatedService.delay,
        transDate: updatedService.transDate,
        expireDate: updatedService.expireDate,
        serviceFees: updatedService.serviceFees,
      })
    }
  }),
)

serviceRouter.get(
  '/:email',
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.get, req.body.email== ', req.params.email)

    //const user = await User.findOne({ email: req.body.email })
    const service = await Service.find({ email: req.params.email })

    console.log('THESE ARE THE serviceS==', service)

    if (service) {
      res.send(service)
    } else {
      res.status(404).send({ message: 'Service Not Found' })
    }
  }),
)

serviceRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.delete(')
    const service = await Service.findOneAndDelete(
      { id: req.params._id },

      function (err, service) {
        if (!err) {
          res.send({ message: req.params._id + ' removed' })
        } else {
          res.status(404).send({ message: 'Service not found' })
        }
      },
    )
  }),
)

serviceRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
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
        service.reviews.reduce((a, c) => c.rating + a, 0) /
        service.reviews.length

      const updatedService = await service.save()
      res.status(201).send({
        message: 'Review Created',
        review: updatedService.reviews[updatedService.reviews.length - 1],
      })
    } else {
      res.status(404).send({ message: 'Service Not Found' })
    }
  }),
)

export default serviceRouter
