// models/Application.js

const mongoose = require('mongoose');

const applicationSchema =
new mongoose.Schema({

    /* ================= USER ================= */

    userId:{

        type:
        mongoose.Schema.Types.ObjectId,

        ref:'User',

        required:true
    },



    /* ================= JOB ================= */

    jobId:{

        type: Number,
        required:true
    },



    /* ================= GENERAL ================= */

    fullname:{

        type:String,

        required:true,

        trim:true
    },

    adhaar:{

        type:String,

        required:true,

        unique:true
    },

    mobileno:{

        type:String,

        required:true
    },

    gender:{

        type:String,

        enum:[
            'male',
            'female',
            'other'
        ]
    },

    parentstatus:{

        type:String,

        enum:[
            'both',
            'father',
            'mother',
            'orphan'
        ],
        required:true
    },

    fathername:{
        type:String,
        default:null
    },

    mothername:{
        type:String,
        default:null
    },

    gurdianname:{
        type:String,
        default:null
    },

    email:{
        type:String,
        required:true
    },



    /* ================= CATEGORY ================= */

    category:{

        type:String,

        enum:[
            'OC',
            'BC-A',
            'BC-B',
            'BC-C',
            'BC-D',
            'BC-E',
            'SC',
            'ST',
            'EWS'
        ],
        required:true
    },



    annualincome:Number,

    identificationmark1:String,

    identificationmark2:String,

    fulladdress:String,



    /* ================= EDUCATION ================= */

    education:{

        ssc:{

            board:{
                type:String,
                default:null
            },

            percentage:{
                type:Number,
                default:null
            }
            
        },



        intermediateOrDiploma:{

            type:String,

            enum:[
                'intermediate',
                'diploma',
                'none'
            ],
            default:'none'
        },



        intermediate:{

            collegename:{
                type:String,
                default:null
            },

            percentage:{
                type:Number,
                default:null
            },

            passedoutyear:{
                type:Number,
                default:null
            }
        },



        diploma:{

            collegename:{
                type:String,
                default:null
            },

            percentage:{
                type:Number,
                default:null
            },

            passedoutyear:{
                type:Number,
                default:null
            }
        },



        higherStudies:{

            stype:{

                type:String,

                enum:[
                    'degree',
                    'btech',
                    'mtech',
                    'other',
                    'none'
                ],
                default: 'none'
            },

            specialotherstudy:{
                type:String,
                default:null
            },

            universityname:{
                type:String,
                default:null
            },

            percentage:{
                type:String,
                default:null
            },

            branch:{
                type:String,
                default:null
            },

            passedoutyear:{
                type:Number,
                default:null
            }
        }

    },



    /* ================= DOCUMENTS ================= */

    documents:{

        identityProof:String,

        sscMarksMemo:String,

        recentExaminationMarksMemo:String,

        incomeCertificate:String,

        casteCertificate:String,

        passportPhoto:String,

        signature:String,

        resume:String

    },



    /* ================= STATUS ================= */

    status:{

        type:String,

        enum:[
            'pending',
            'under_review',
            'shortlisted',
            'accepted',
            'rejected'
        ],

        default:'pending'
    },



    adminMessage:String,



    appliedAt:{

        type:Date,

        default:Date.now
    }

},

{
    timestamps:true
});

module.exports =
mongoose.model(
    'Application',
    applicationSchema
);