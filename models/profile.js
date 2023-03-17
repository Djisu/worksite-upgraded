const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
        required: true,
      },
      customer: {
        type: String,
        required: true,
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
        type: mongoose.Schema.Types.ObjectId,
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

module.exports = Profile = mongoose.model('profile', ProfileSchema)
