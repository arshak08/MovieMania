const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A movie needs title']
  },
  director: {
    type: String,
    required: [true, 'Director name.']
  },
  releaseDate: {
    type: Date
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
