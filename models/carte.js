const mongoose = require('mongoose')

const carteItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('Carte', carteItemSchema)