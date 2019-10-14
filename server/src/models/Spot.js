const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  techs: [{
    type: String,
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true
  }
});

// Toda vez que um Spot for convertido em JSON os virtuals 
// vão ser calculados automaticamente

// Virtual field Mongoosefiles/

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://192.168.15.13:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);
