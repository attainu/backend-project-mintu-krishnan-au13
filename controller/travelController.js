const fs = require('fs');

const travels = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/travels-simple.json`)
);

exports.getAllTravels = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: travels.length,
    data: {
      travels: travels,
    },
  });
};
exports.getTravel = (req, res) => {
  const id = req.params.id * 1;

  const travel = travels.find((el) => el.id === id);

  if (!travel) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    result: travels.length,
    data: {
      travels: travel,
    },
  });
};
exports.createTravel = (req, res) => {
  const newId = travels[travels.length - 1].id + 1;
  const newTravel = Object.assign({ id: newId }, req.body);
  travels.push(newTravel);

  fs.writeFile(
    `${__dirname}/dev-data/data/travels-simple.json`,
    JSON.stringify(travels),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          travels: newTravel,
        },
      });
    }
  );
};
exports.updateTravel = (req, res) => {
  if (req.params.id * 1 > travels.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      travels: '<Updated tour content>',
    },
  });
};

exports.deleteTravel = (req, res) => {
  if (req.params.id * 1 > travels.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
