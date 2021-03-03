const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A travel must have a name'],
    unique: [true, ' A travel name must be unique'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A travel must have a price'],
  },
});
const Travel = mongoose.model('travel', travelSchema);

module.exports = Travel;
