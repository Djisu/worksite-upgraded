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
  isPaid: { type: Boolean, required: true, default: false },
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)
