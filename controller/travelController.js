const Travel = require('./../models/travelModel');

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
exports.createTravel = async (req, res) => {
  try {
    const newTravel = await Travel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        travel: newTravel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed to create travel',
      message: err,
    });
  }
};

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
