const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  paymentId: {
    type: String,
    required: true,
  },
  transDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
})

module.exports = Payment = mongoose.model('payment', PaymentSchema)
