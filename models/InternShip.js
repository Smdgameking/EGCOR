// models/Internship.js

const mongoose = require('mongoose');

const internshipSchema =
new mongoose.Schema({

    /* ================= RELATIONS ================= */

    applicationId:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:'Application',

        required:true,

        index:true
    },



    userId:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:'User',

        required:true
    },



    jobId:{

        type: Number,
        default:null,

        required:true
    },



    /* ================= INTERNSHIP DETAILS ================= */

    organization:{

        type:String,
        required:true,
        defult:null
    },

    role:{

        type:String,
        required:true,
        defult:null
    },

    duration:{

        type:String,
        required:true,
        defult:null
    },

    stipend:{

        type:Number,
        defult:0
    },

    joiningDate:{

        type:Date,
        required:true,
        defult:null
    },

    endingDate:{

        type:Date,
        required:true,
        defult:null
    },

    skillsLearned:{

        type:String,
        required:true,
        defult:null
    }

},

{
    timestamps:true
});

module.exports =
mongoose.model(
    'Internship',
    internshipSchema
);