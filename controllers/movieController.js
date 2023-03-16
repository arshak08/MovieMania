const Movie = require('./../models/movieModel');
const catchAsync = require('./../utils/catchAsync');
const APIfeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const features = new APIfeatures(Movie.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const movies = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: movies.length,
    data: {
      movies
    }
  });
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(new AppError('No movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.createMovie = catchAsync(async (req, res, next) => {
  const newMovie = await Movie.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      movie: newMovie
    }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!movie) {
    return next(new AppError('No Movie found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      movie
    }
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
