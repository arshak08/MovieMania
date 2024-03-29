const express = require('express');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const movieRouter = require('./routes/movieRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
