const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        lastname: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other']
    },
    qualification: {
        type: String,
        required: true,
        enum: ['10th pass', '12th pass', 'Diploma','Degree', 'B.Tech']
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    confirmpassword: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
});

module.exports = mongoose.model('User', userSchema);