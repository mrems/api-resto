const mongoose = require('mongoose')

const horaireSchema = new mongoose.Schema({
  jour: {
    type: String,
    required: true
  },
  midi: {
    type: String,
    required: true
  },
  soir: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Horaire', horaireSchema)