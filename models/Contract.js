const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    transDate: { type: Date, required: true },
    completeDate: { type: Date, required: true },
    description: { type: String, required: true },
    documents: { type: [String] },
    comments: { type: String },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    isCompleted: { type: Boolean, required: true },
    service: { type: String, required: true },
    email: { type: String, required: true },
    telno: { type: String },
    serviceEmail: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('contract', ContractSchema)
