const mongoose = require('mongoose');

const latestNotifySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('LatestNotify', latestNotifySchema);