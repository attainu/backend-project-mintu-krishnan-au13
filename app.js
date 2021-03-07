const express = require('express');
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const travelRouter = require('./routes/travelRouters');
const userRouter = require('./routes/userRoutes');

app.use(express.json());

app.use('/api/v1/travels', travelRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
