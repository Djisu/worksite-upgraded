import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Service from '../models/serviceModel.js'
import { isAuth } from '../utils.js'

const serviceRouter = express.Router()

serviceRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const services = await Service.find({
      endDate: { $gt: new Date() },
    })
    res.send(services)
  }),
)

serviceRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
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
        transDate: req.body.transDate,
        endDate: req.body.endDate,
        serviceFees: req.body.serviceFees,
        units: req.body.units,
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
        transDate: createdServices.transDate,
        endDate: createdServices.endDate,
        serviceFees: createdServices.serviceFees,
        units: createdServices.units,
      })
    }
  }),
)

serviceRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.put req ooooooooooo', req.params._id)
    const serviceId = req.params.id

    const service = await Service.findById(serviceId)

    if (service) {
      service.name = req.body.name
      service.image = req.body.images
      service.unitPrice = req.body.unitPrice
      service.description = req.body.description
      service.endDate = req.body.endDate

      const updatedService = await service.save()

      console.log('updatedService==', updatedService)

      res.send({ message: 'Service Updated', service: updatedService })
    } else {
      res.status(404).send({ message: 'Service Not Found' })
    }
  }),
)

serviceRouter.get(
  '/:email',
  expressAsyncHandler(async (req, res) => {
    console.log('serviceRouter.get')

    console.log('const service = await Service.find')

    const service = await Service.find({
      email: req.params.email,
      endDate: { $gt: new Date() },
    })

    console.log('serviceRouter.get service ==', service) //  endDate: { $gte: today.toDate() },,

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
    console.log('in serviceRouter.delete()')
    await Service.findOneAndDelete(
      { id: req.params._id },

      function (err) {
        if (!err) {
          res.send({ message: req.params._id + ' removed' })
        } else {
          res.status(404).send({ message: 'Service not found' })
        }
      },
    )
  }),
)

serviceRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in serviceRouter.get(')

    const service = await Service.findById(req.params.id)

    if (service) {
      res.send(service)
    } else {
      res.status(404).send({ message: 'Service not found' })
    }
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
