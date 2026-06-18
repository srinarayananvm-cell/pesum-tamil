const mongoose = require('mongoose');

const DialectWordSchema = new mongoose.Schema({

  english: {
    type: String,
    required: true
  },

  dialect: {
    type: String,
    required: true
  },

  tamil: {
    type: String,
    
  },

  region: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model(
  'DialectWord',
  DialectWordSchema
);