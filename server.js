const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  });

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

const testTravel = new Travel({
  name: 'the sea hiker',
  price: 497,
});

testTravel
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('❌ error ❌', err);
  });

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
