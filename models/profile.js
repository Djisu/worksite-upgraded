const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  company: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      title: {
        type: String,
      },
      customer: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
  bio: {
    type: String,
  },
  images: { type: [String] },
  transDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = mongoose.model('profile', ProfileSchema)
