const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Travel = require('./../../models/travelModel');
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
    console.log('🟢 DB connection Successful ');
  });

const travels = JSON.parse(
  fs.readFileSync(`${__dirname}/travels-simple.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Travel.create(travels);
    console.log('Data Successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Travel.deleteMany();
    console.log('Data Successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
