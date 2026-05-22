const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    totalApplications: {
        type: Number,
        default: 0
    },
    totalNotifications: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('TotalApplicationsNotifications', newsSchema);