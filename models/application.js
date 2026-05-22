const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({

    /* ================= GENERAL DETAILS ================= */

    fullName: {
        type: String,
        trim: true
    },

    aadhaarNumber: {
        type: String,
        unique: true,
        match: /^[0-9]{12}$/
    },

    mobileNumber: {
        type: String,
        match: /^[0-9]{10}$/
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },

    parentStatus: {
        type: String,
        enum: [
            'both',
            'father',
            'mother',
            'orphan'
        ],
    },

    fatherName: {
        type: String,
        default: ''
    },

    motherName: {
        type: String,
        default: ''
    },

    guardianName: {
        type: String,
        default: ''
    },

    email: {
        type: String,
        lowercase: true,
        trim: true,
        default: ''
    },

    category: {
        type: String,
        enum: [
            'OC',
            'BC-A',
            'BC-B',
            'BC-C',
            'BC-D',
            'SC',
            'ST',
            'EWS'
        ],
    },

    annualIncome: {
        type: Number,
    },

    identificationMark1: {
        type: String,
    },

    identificationMark2: {
        type: String,
    },

    address: {
        type: String,
    },

    /* ================= EDUCATION DETAILS ================= */

    education: {

        ssc: {

            board: {
                type: String,
                default: ''
            },

            percentage: {
                type: Number,
                default: null
            }

        },

        intermediateOrDiploma: {

            qualificationType: {
                type: String,
                enum: [
                    'intermediate',
                    'diploma',
                    'none'
                ],
                default: 'none'
            },

            collegeName: {
                type: String,
                default: ''
            },

            percentage: {
                type: Number,
                default: null
            },

            passedOutYear: {
                type: Number,
                default: null
            }

        },

        higherStudies: {

            qualificationType: {
                type: String,
                enum: [
                    'degree',
                    'btech',
                    'mtech',
                    'other',
                    'none'
                ],
                default: 'none'
            },

            otherQualification: {
                type: String,
                default: ''
            },

            collegeName: {
                type: String,
                default: ''
            },

            percentageOrCgpa: {
                type: String,
                default: ''
            },

            specialization: {
                type: String,
                default: ''
            },

            passedOutYear: {
                type: Number,
                default: null
            }

        }

    },

    /* ================= EXPERIENCE DETAILS ================= */

    experienceType: {
        type: String,
        enum: [
            'fresher',
            'experienced'
        ],
        default: 'fresher'
    },

    internships: [

        {

            organizationName: {
                type: String,
                default: ''
            },

            role: {
                type: String,
                default: ''
            },

            duration: {
                type: String,
                default: ''
            },

            stipend: {
                type: Number,
                default: null
            },

            joiningDate: {
                type: Date,
                default: null
            },

            endDate: {
                type: Date,
                default: null
            },

            skillsLearned: {
                type: String,
                default: ''
            }

        }

    ],

    experiences: [

        {

            organizationName: {
                type: String,
                default: ''
            },

            designation: {
                type: String,
                default: ''
            },

            totalExperience: {
                type: String,
                default: ''
            },

            currentSalary: {
                type: Number,
                default: null
            },

            joiningDate: {
                type: Date,
                default: null
            },

            relievingDate: {
                type: Date,
                default: null
            },

            employmentType: {
                type: String,
                enum: [
                    'Full Time',
                    'Contract',
                    'Temporary',
                    'Outsourcing'
                ],
                default: 'Full Time'
            },

            workLocation: {
                type: String,
                default: ''
            },

            rolesAndResponsibilities: {
                type: String,
                default: ''
            }

        }

    ],

    /* ================= DOCUMENTS ================= */

    documents: {

        identityProof: {
            type: String,
            default: ''
        },

        sscMarksMemo: {
            type: String,
            default: ''
        },

        recentExaminationMarksMemo: {
            type: String,
            default: ''
        },

        incomeCertificate: {
            type: String,
            default: ''
        },

        casteCertificate: {
            type: String,
            default: ''
        },

        passportPhoto: {
            type: String,
            default: ''
        },

        signature: {
            type: String,
            default: ''
        },

        resume: {
            type: String,
            default: ''
        }

    }
});

module.exports =mongoose.model('Application',ApplicationSchema);