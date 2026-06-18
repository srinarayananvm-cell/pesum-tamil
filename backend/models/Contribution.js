const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({

  english: {
    type: String,
    required: true
  },

  dialect: {
    type: String,
    required: true
  },

  region: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports =
  mongoose.model(
    'Contribution',
    ContributionSchema
  );