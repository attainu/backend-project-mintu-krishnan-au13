const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

const PORT = 3001;

// 1.MIDDLEWARES

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('middleware working');
  next();
});

// 2.ROUTE HANDLERS

const travels = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/travels-simple.json`)
);

const getAllTravels = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: travels.length,
    data: {
      travels: travels,
    },
  });
};
const getTravel = (req, res) => {
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
const createTravel = (req, res) => {
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
const updateTravel = (req, res) => {
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

const deleteTravel = (req, res) => {
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

// 3. Route

// app.get('/api/v1/travels', getAllTravels);
// app.post('/api/v1/travels', createTravel);

app.route('/api/v1/travels').get(getAllTravels).post(createTravel);

// app.get('/api/v1/travels/:id', getTravel);
// app.patch('/api/v1/travels/:id', updateTravel);
// app.delete('/api/v1/travels/:id', deleteTravel);

app
  .route('/api/v1/travels/:id')
  .get(getTravel)
  .patch(updateTravel)
  .delete(deleteTravel);

// 4.Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
