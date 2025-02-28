const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    poster: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
},{timestamps:true});


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;