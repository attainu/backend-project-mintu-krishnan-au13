const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const travelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A travel must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A travel name cannot exceed 40 characters'],
      minlength: [5, 'A travel name must be minimum of 10 characters'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [0.5, 'Ratings must be above 0.5'],
      max: [5, 'Ratings cannot exceed 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A travel must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
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
    secretTravel: {
      type: Boolean,
      default: false,
    },
    startDates: [Date],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

travelSchema.virtual('durationWeeks').get(function () {
  return Math.round((this.duration / 7) * 10) / 10;
});
// Document middleware
travelSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// embedding guide data in travel model by pre document middleware
// travelSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });
// travelSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// query middleware
travelSchema.pre(/^find/, function (next) {
  this.find({ secretTravel: { $ne: true } });
  this.start = Date.now();
  next();
});
travelSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// aggregation middleware
travelSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTravel: { $ne: true },
    },
  });
  next();
});

const Travel = mongoose.model('travel', travelSchema);

module.exports = Travel;
