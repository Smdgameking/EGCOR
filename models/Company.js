// models/Company.js

const mongoose = require('mongoose');

const companySchema =
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
        required:true
    },



    /* ================= COMPANY DETAILS ================= */

    organization:{

        type:String,
        required:true,
        defult:null
    },

    designation:{

        type:String,
        required:true,
        defult:null
    },

    totalExperience:{

        type:String,
        required:true,
        defult:null
    },

    currentSalary:{

        type:Number,
        required:true,
        defult:null
    },

    joiningDate:{

        type:Date,
        required:true,
        defult:null
    },

    relievingDate:{

        type:Date,
        required:true,
        defult:null
    },

    employmentType:{

        type:String,

        enum:[
            'Full Time',
            'Contract',
            'Temporary',
            'Outsourcing'
        ],
        required:true,
        defult:null
    },

    location:{

        type:String,
        required:true,
        defult:null
    },

    rolesResponsibilities:{

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
    'Company',
    companySchema
);