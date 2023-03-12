const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const ServiceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    serviceId: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: [String] },
    unitPrice: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    description: { type: String, required: true },
    reviews: [ReviewSchema],
    transDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    serviceFees: { type: Number },
    units: { type: String },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

module.exports = Service = mongoose.model('service', ServiceSchema)
