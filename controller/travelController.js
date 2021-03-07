const Travel = require('./../models/travelModel');
const APIfeatures = require('./../utils/apiFeatures');

exports.aliasTopTravels = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.getAllTravels = async (req, res) => {
  try {
    const features = new APIfeatures(Travel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const travels = await features.query;

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
exports.getTravel = catchAsync(async (req, res, next) => {
  const travels = await Travel.findById(req.params.id);
  res.status(200).json({
    status: 'Success ✅',
    results: travels.length,
    data: {
      travels: travels,
    },
  });
});

exports.createTravel = catchAsync(async (req, res, next) => {
  const newTravel = await Travel.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      travel: newTravel,
    },
  });
});

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

exports.getTravelStats = async (req, res) => {
  try {
    const stats = await Travel.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTravels: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'Success ✅',
      stats,
    });
  } catch {
    res.status(404).json({
      status: 'fail ❌',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;
    const plan = await Travel.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTravelStarts: { $sum: 1 },
          travels: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $sort: { numTravelStarts: -1 },
      },
    ]);

    res.status(200).json({
      status: 'Success ✅',
      length: plan.length,
      year,
      plan,
    });
  } catch {
    res.status(404).json({
      status: 'fail ❌',
      message: err,
    });
  }
};
