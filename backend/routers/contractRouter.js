import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import data from '../data.js'
import Contract from '../models/contractModel.js'
import { isAuth } from '../utils.js'
//var TMClient = require('textmagic-rest-client');
//import TMClient from 'textmagic-rest-client'
//var nodemailer = require('nodemailer')

import { keys } from '../config/keys.js'
import nodemailer from 'nodemailer'
const { user, pass } = keys

let contractRouter = express.Router()

contractRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    //console.log('in contractRouter.get')

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
      //console.log('in contractRouter.post')

      //const varTelno = req.body.telno

      const contract = new Contract({
        user: req.body.user,
        delay: req.body.delay,
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
      })
      //console.log('new Contract==', contract)

      //await Contract.remove({})

      const createdContract = await contract.save()

      /*  console.log('Contract created==', createdContract)
      console.log('About to send email') */

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
        delay: createdContract.delay,
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
  // WORK ON THIS. IT IS NOT COMPLETE!!!!
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const contract = await Contract.findById(req.contract._id)

    if (contract) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }

      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
    }
  }),
)

contractRouter.get(
  '/:email',
  expressAsyncHandler(async (req, res) => {
    // console.log('in contractRouter.get email==', req.params.email)
    const contract = await Contract.find({ email: req.params.email })

    if (contract) {
      //console.log('contract==', contract)
      res.send(contract)
    } else {
      res.status(404).send({ message: 'Contract Not Found' })
    }
  }),
)

contractRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    console.log('in contractRouter.delete(')
    const contract = await Contract.findOneAndDelete(
      { id: req.params._id },

      function (err, contract) {
        if (!err) {
          res.send({ message: req.params._id + ' removed' })
        } else {
          res.status(404).send({ message: 'Contract not found' })
        }
      },
    )
  }),
)

export default contractRouter
