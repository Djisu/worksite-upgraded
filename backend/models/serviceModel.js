import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
    name: { type: String, required: true, unique: true },
    image: { type: String },
    unitPrice: { type: Number, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    description: { type: String, required: true },
    telno: { type: String },
    reviews: [reviewSchema],
    transDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    serviceFees: { type: Number },
    units: { type: String, required: true },
  },
  {
    timestamps: true,
  },
)

const Service = mongoose.model('Service', serviceSchema)

export default Service

//, unique: true , required: true
