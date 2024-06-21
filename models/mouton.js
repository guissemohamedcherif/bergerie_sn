const mongoose = require('mongoose');

const moutonSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    defaultValue: 0
  },
  avatar: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

module.exports = mongoose.model('Mouton', moutonSchema);