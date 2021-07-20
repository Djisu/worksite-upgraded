import mongoose from 'mongoose'

const servicefeesSchema = new mongoose.Schema(
  {
    Service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    serviceFees: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const Servicefees = mongoose.model('Servicefees', servicefeesSchema)

export default Servicefees
