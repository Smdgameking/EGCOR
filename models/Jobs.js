const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Job', jobSchema);