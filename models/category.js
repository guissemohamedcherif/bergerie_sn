const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: new Date(),
},
});

module.exports = mongoose.model('Category', categorySchema);