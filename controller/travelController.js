const fs = require('fs');
const Travel = require('./../models/travelModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'missing name or price',
    });
  }
  next();
};

exports.getAllTravels = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
exports.getTravel = (req, res) => {
  res.status(200).json({
    status: 'success',
  });
};
exports.createTravel = (req, res) => {};
exports.updateTravel = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      travels: '<Updated tour content>',
    },
  });
};
exports.deleteTravel = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
