const mongoose = require('mongoose')
//var Schema = mongoose.Schema;

const ServicefeesSchema = new mongoose.Schema(
  {
    servicename: { type: String, required: true },
    serviceFees: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
)

const Servicefees = mongoose.model('servicefees', ServicefeesSchema)

// export default Servicefees
