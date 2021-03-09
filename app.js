const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');


const AppError = require('./utils/apiError');
const globalErrorHandler = require('./controller/errorController');
const travelRouter = require('./routes/travelRouters');
const userRouter = require('./routes/userRoutes');

const app = express();

//GLOBAL MIDDLEWARES
//set security HTTP headers
app.use(helmet())

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


//Body parser, reading data from body into req.body
app.use(express.json({
  limit: '10kb'
}));

app.use('/api/v1/travels', travelRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;