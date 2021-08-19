import express from 'express'
import expressAsyncHandler from 'express-Async-Handler'
import bcrypt from 'bcryptjs'
import data from '../data.js'
import User from '../models/userModel.js'
import { generateToken, isAuth } from '../utils.js'

const userRouter = express.Router()

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdUsers = await User.insertMany(data.users)
    res.send({ createdUsers })
  }),
)

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          address: user.address,
          telno: user.telno,
          employmentStatus: user.employmentStatus,
          country: user.country,
          token: generateToken(user),
        })
        return
      }
    }
    res.status(401).send({ message: 'Invalid email or password' })
  }),
)

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    console.log('in /register backend')

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      address: req.body.address,
      telno: req.body.telno,
      employmentStatus: req.body.employmentStatus,
      country: req.body.country,
    })
    const createdUsers = await user.save()

    console.log('const createdUsers = await user.save()')
    res.send({
      _id: createdUsers._id,
      name: createdUsers.name,
      email: createdUsers.email,
      isAdmin: createdUsers.isAdmin,
      address: createdUsers.address,
      telno: createdUsers.telno,
      employmentStatus: createdUsers.employmentStatus,
      country: createdUsers.country,
      token: generateToken(createdUsers),
    })
  }),
)

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ message: 'User Not Found' })
    }
  }),
)

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.employmentStatus = req.body.employmentStatus
      user.country = req.body.country

      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8)
      }

      const updatedUser = await user.save()
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        address: updatedUser.address,
        telno: updatedUser.telno,
        employmentStatus: updatedUser.employmentStatus,
        country: updatedUser.country,
        token: generateToken(updatedUser),
      })
    }
  }),
)
export default userRouter
