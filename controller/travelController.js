const Travel = require('./../models/travelModel');

exports.aliasTopTravels = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

exports.getAllTravels = async (req, res) => {
  try {
    // 1. build query
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    //2.  advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Travel.find(JSON.parse(queryStr));

    // 3. Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 4. Filed limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 5. Pagination

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTravels = await Travel.countDocuments();
      if (skip > numTravels) throw new Error('This page does not exists');
    }

    //6. execute query
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
