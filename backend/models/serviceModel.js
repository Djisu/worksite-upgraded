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
    email: { type: String },
    name: { type: String, required: true },
    image: { type: String },
    unitPrice: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    description: { type: String, required: true },
    telno: { type: String },
    reviews: [reviewSchema],
    delay: { type: Number, required: true },
    transDate: { type: Date },
    expireDate: { type: Date },
    serviceFees: { type: Number },
  },
  {
    timestamps: true,
  },
)

const Service = mongoose.model('Service', serviceSchema)

export default Service
