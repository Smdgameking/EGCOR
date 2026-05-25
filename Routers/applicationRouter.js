// routes/applicationRoutes.js

const express = require('express');

const router = express.Router();

const multer = require('multer');

const path = require('path');

const fs = require('fs');

const Application =
require('../models/application');

const Company =
require('../models/Company');

const Internship =
require('../models/InternShip');

const isLoggedIn =
require('../middlewares/isLoggedIn');

function renderApplicationError(res, error) {
  res.status(500).render('ErrorPage', {
    title: 'Application Submission Failed',
    message: 'We could not submit your application right now. Please review the form, then try again.',
    details: error.message || 'Unexpected error during application submission.',
    backUrl: '/dashboard'
  });
}







/* ================= STORAGE ================= */

const storage =
multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,'uploads/');
    },

    filename:function(req,file,cb){

        const uniqueName =

        Date.now()

        + '-'

        + Math.round(
            Math.random() * 1E9
        )

        + path.extname(
            file.originalname
        );

        cb(null,uniqueName);

    }

});



/* ================= FILE FILTER ================= */

const fileFilter =
(req,file,cb)=>{

    const allowedTypes =
    /jpg|jpeg|png|pdf/;

    const extname =
    allowedTypes.test(

        path.extname(
            file.originalname
        ).toLowerCase()

    );

    const mimetype =
    allowedTypes.test(
        file.mimetype
    );

    if(extname && mimetype){

        cb(null,true);

    }

    else{

        cb(
            new Error(
                'Only JPG, JPEG, PNG and PDF files allowed'
            )
        );

    }

};



/* ================= MULTER ================= */

const upload =
multer({

    storage,

    fileFilter,

    limits:{

        fileSize:
        5 * 1024 * 1024
    }

});



/* ================= APPLY PAGE ================= */

router.get(

'/apply/:id',

isLoggedIn,

(req,res)=>{

    const applicationId =
    req.params.id;

    res.render(
        'Application',
        {
            UserId:req.session.user.id,
            jobId:applicationId
        }
    );
    console.log(req.session.user.id);

});



/* ================= APPLY POST ================= */

router.post(

'/apply',

isLoggedIn,

upload.fields([

    { name:'identityProof', maxCount:1 },

    { name:'sscMarksMemo', maxCount:1 },

    { name:'recentExaminationMarksMemo', maxCount:1 },

    { name:'incomeCertificate', maxCount:1 },

    { name:'casteCertificate', maxCount:1 },

    { name:'passportPhoto', maxCount:1 },

    { name:'signature', maxCount:1 },

    { name:'resume', maxCount:1 }

]),

async(req,res)=>{

    try{

        /* ================= USER ================= */


        const username =
        req.session.user.username;



        /* ================= FILES ================= */

        const uploadedFiles = {};



        for(const fieldName in req.files){

            const file =
            req.files[fieldName][0];

            const extension =

            path.extname(
                file.originalname
            );

            const newFileName =

            Date.now()

            + '_'

            + username

            + '_'

            + fieldName

            + extension;

            const oldPath =
            file.path;

            const newPath =
            'uploads/' + newFileName;

            fs.renameSync(
                oldPath,
                newPath
            );

            uploadedFiles[fieldName] =
            newPath;

        }



        /* ================= CREATE APPLICATION ================= */
        console.log(req.body);
        console.log(req.body[`internshipOrganization${1}`]);
        const newApplication =
        await Application.create({


            /* RELATION */

            userId: req.session.user.id,

            jobId:req.body.jobId,



            /* GENERAL */

            fullname:
            req.body.fullname,

            adhaar:
            req.body.adhaar,

            mobileno:
            req.body.mobileno,

            gender:
            req.body.gender,

            parentstatus:
            req.body.parentstatus,

            fathername:
            req.body.fathername,

            mothername:
            req.body.mothername,

            gurdianname:
            req.body.gurdianname,

            email:
            req.body.email,

            category:
            req.body.category,

            annualincome:
            req.body.annualincome,

            identificationmark1:
            req.body.identificationmark1,

            identificationmark2:
            req.body.identificationmark2,

            fulladdress:
            req.body.fulladdress,



            /* EDUCATION */

            education:{

                ssc:{

                    board:
                    req.body.sscboardName,

                    percentage:
                    req.body.sscpercentage
                },



                intermediateOrDiploma: req.body.InterOrDip,



                intermediate:{

                    collegename:
                    req.body.InterCollagename,

                    percentage:
                    req.body.InterPercentage,

                    passedoutyear:
                    req.body.InterPassedOutYear
                },



                diploma:{

                    collegename:
                    req.body.DipCollegename,

                    percentage:
                    req.body.DipPercentage,

                    passedoutyear:
                    req.body.DipPassedOutYear
                },



                higherStudies:{

                    type:
                    req.body.higherstudies,

                    specialotherstudy:
                    req.body.specialotherstudy,

                    universityname:
                    req.body.universityname,

                    percentage:
                    req.body.percentage,

                    branch:
                    req.body.branch,

                    passedoutyear:
                    req.body.passedoutyear
                }

            },



            /* EXPERIENCE */

            applicanttype:
            req.body.applicanttype,

            internshipExperience:
            req.body.experience,

            noofinternshipcompanies:
            req.body.noofinternshipcompanies,

            noofcompaniesworked:
            req.body.noofcompaniesworked,



            /* DOCUMENTS */

            documents:
            uploadedFiles

        });



        /* ================= SAVE COMPANIES ================= */


        const companyNumbers = parseInt(req.body.NoOfCompaniesWorked)||0;

        for(let i=1; i<=companyNumbers; i++){
            await Company.create({

                    applicationId:
                    newApplication._id,

                    userId:req.session.user.id,

                    jobId:req.body.jobId,

                    organization:
                    req.body[`organizationName${i}`],

                    designation:
                    req.body[`designation${i}`],

                    totalExperience:
                    req.body[`totalExperience${i}`],

                    currentSalary:
                    req.body[`currentSalary${i}`],

                    joiningDate:
                    req.body[`joiningDate${i}`],

                    relievingDate:
                    req.body[`relievingDate${i}`],

                    employmentType:
                    req.body.employmentType,

                    location:
                    req.body.workLocation,

                    rolesResponsibilities:
                    req.body[`role${i}`]

            });
        }




        /* ================= SAVE INTERNSHIPS ================= */


        const internshipCount = parseInt(req.body.NoOfInternshipCompanies)||0;

        for(let i=1; i<=internshipCount; i++){

            await Internship.create({

                    applicationId:
                    newApplication._id,

                    userId:req.session.user.id,

                    jobId:req.body.jobId,

                    organization:
                    req.body[`internshipOrganization${i}`],

                    role:
                    req.body[`internshipRole${i}`],

                    duration:
                    req.body[`internshipDuration${i}`],

                    stipend:
                    req.body[`internshipStipend${i}`],

                    joiningDate:
                    req.body[`internshipJoiningDate${i}`],

                    endingDate:
                    req.body[`internshipEndingDate${i}`],

                    skillsLearned:
                    req.body[`internshipSkillsLearned${i}`]

            });
        }
        /* ================= SUCCESS ================= */
        
        res.redirect('/dashboard');

    }

    catch(error){

        console.log(error);

        renderApplicationError(res, error);

    }

});


module.exports = router;