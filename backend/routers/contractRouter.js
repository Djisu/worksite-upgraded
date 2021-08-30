import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Contract from '../models/contractModel.js'
import { isAuth } from '../utils.js'
import { keys } from '../config/keys.js'
import nodemailer from 'nodemailer'
const { user, pass } = keys

let contractRouter = express.Router()

contractRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const contracts = await Contract.find({})
    res.send(contracts)
  }),
)

contractRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Contract.remove({})
    const createdContracts = await Contract.insertMany(data.contracts)
    res.send({ createdContracts })
  }),
)

contractRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (!req.body) {
      res.status(400).send({ message: 'Contract is empty' })
    } else {
      console.log('in contractRouter.post')

      const contract = new Contract({
        user: req.body.user,
        transDate: req.body.transDate,
        completeDate: req.body.completeDate,
        description: req.body.description,
        documents: req.body.documents,
        comments: req.body.comments,
        quantity: req.body.quantity,
        unitPrice: req.body.unitPrice,
        totalCost: req.body.totalCost,
        isPaid: req.body.isPaid,
        isCompleted: req.body.isCompleted,
        service: req.body.service,
        email: req.body.email,
        telno: req.body.telno,
        serviceEmail: req.body.serviceEmail,
        image: req.body.imagex,
      })
      console.log('new Contract==', contract)

      //await Contract.remove({})

      const createdContract = await contract.save()

      console.log('Contract created==', createdContract)
      console.log('About to send email')

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

      res.status(201).send({
        _id: createdContract._id,
        user: createdContract.user,
        transDate: createdContract.transDate,
        completeDate: createdContract.completeDate,
        description: createdContract.description,
        documents: createdContract.documents,
        comments: createdContract.comments,
        quantity: createdContract.quantity,
        unitPrice: createdContract.unitPrice,
        totalCost: createdContract.totalCost,
        isPaid: createdContract.isPaid,
        isCompleted: createdContract.isCompleted,
        service: createdContract.service,
        email: createdContract.email,
        telno: createdContract.telno,
        serviceEmail: createdContract.serviceEmail,
      })
    }
  }),
)

contractRouter.put(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
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
  }),
)

contractRouter.get(
  '/:email',
  expressAsyncHandler(async (req, res) => {
    const contract = await Contract.find({ email: req.params.email })

    if (contract) {
      res.send(contract)
    } else {
      res.status(404).send({ message: 'Contract Not Found' })
    }
  }),
)

contractRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in contractRouter.delete()', req.params.id)
    const contractid = req.params.id

    const contract = await Contract.deleteOne({ _id: contractid })

    if (contract) {
      res.send(contract)
    } else {
      res.status(404).send({ message: 'Contract Not Found' })
    }
  }),
)

export default contractRouter
