import mongoose from 'mongoose'
//var Schema = mongoose.Schema;

const servicefeesSchema = new mongoose.Schema(
  {
    serviceFees: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const Servicefees = mongoose.model('Servicefees', servicefeesSchema)

export default Servicefees
