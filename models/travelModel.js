const mongoose = require('mongoose');
const slugify = require('slugify');

const travelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A travel must have a name'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A travel must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A travel must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A travel must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A travel must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A travel must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

travelSchema.virtual('durationWeeks').get(function () {
  return Math.round((this.duration / 7) * 10) / 10;
});

travelSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// travelSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

const Travel = mongoose.model('travel', travelSchema);

module.exports = Travel;
