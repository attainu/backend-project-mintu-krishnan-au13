const Travel = require('./../models/travelModel');

exports.getAllTravels = async (req, res) => {
  try {
    // build query
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const query = Travel.find(queryObj);

    // const travels = Travel.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // execute query
    const travels = await query;

    res.status(200).json({
      status: 'success',
      results: travels.length,
      data: {
        travels: travels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getTravel = async (req, res) => {
  try {
    const travels = await Travel.findById(req.params.id);
    res.status(200).json({
      status: 'Success ✅',
      results: travels.length,
      data: {
        travels: travels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail Invalid Id ❌',
      message: err,
    });
  }
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

exports.updateTravel = async (req, res) => {
  try {
    const travels = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success ✅',
      results: travels.length,
      data: {
        travels: travels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail Invalid Id ❌',
      message: err,
    });
  }
};
exports.deleteTravel = async (req, res) => {
  try {
    const travels = await Travel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Success ✅',
      results: travels.length,
      data: {
        travels: travels,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail Invalid Id ❌',
      message: err,
    });
  }
};
