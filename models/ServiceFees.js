const mongoose = require('mongoose')
//var Schema = mongoose.Schema;

const ServicefeesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  servicefees: { type: Number, required: true },
})

module.exports = Servicefees = mongoose.model('servicefees', ServicefeesSchema)
// const Servicefees = mongoose.model('servicefees', ServicefeesSchema)

// export default Servicefees
