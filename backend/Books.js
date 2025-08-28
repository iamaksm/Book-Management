const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: Number
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;