import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const serviceSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String },
    unitPrice: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    description: { type: String, required: true },
    telno: { type: String },
    reviews: [reviewSchema],
    delay: { type: Number, required: true },
    transDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    serviceFees: { type: Number },
  },
  {
    timestamps: true,
  },
)

const Service = mongoose.model('Service', serviceSchema)

export default Service
