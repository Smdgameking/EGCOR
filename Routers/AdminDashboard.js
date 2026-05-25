// ======================================================
// Routers/adminApplicationRouter.js
// ======================================================

const express = require('express');

const router = express.Router();

const path = require('path');

const fs = require('fs');

const Application =
require('../models/application');

const isLoggedIn =
require('../middlewares/isLoggedIn');

const Company =
require('../models/Company');

const Internship =
require('../models/InternShip');


const user = require('../models/User');


const Job = require('../models/Jobs');

const news = require('../models/News');



/* ======================================================
   APPLICATIONS LIST PAGE
====================================================== */
router.get(
'/dashboard',
isLoggedIn,
async(req,res)=>{

    try{
        if(
            !req.session.user ||
            req.session.user.role !== 'admin'
        ){

            return res.redirect('/auth');

        }

        res.render('AdminDashboard',
            {

                user:req.session.user,

                totalUsers: await user.countDocuments(),

                totalJobs: await Job.countDocuments(),

                totalApplications: await Application.countDocuments(),

                pendingApplications: await Application.countDocuments({status:'pending'}),

                applications: [],

                news: []

            }

        );

    }catch(error){

        console.log(error);

        res.send('Server Error');

    }

});


router.get(
'/applications',
isLoggedIn,

async(req,res)=>{

    try{

        if(
            !req.session.user ||
            req.session.user.role !== 'admin'
        ){

            return res.redirect('/auth');

        }



        const applications =

        await Application.find()

        .populate('jobId')

        .sort({
            createdAt:-1
        });



        res.render(

            'AdminApplicationsView',

            {
                applications,
                singleApplication: null
            }

        );

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});



/* ======================================================
   SINGLE APPLICATION VIEW PAGE
====================================================== */

router.get(
'/application/:id',
isLoggedIn,

async(req,res)=>{

    try{

        if(
            !req.session.user ||
            req.session.user.role !== 'admin'
        ){

            return res.redirect('/auth');

        }



        const application =

        await Application.findById(
            req.params.id
        )

        .populate('jobId')

        .populate('userId');



        const companies =

        await Company.find({

            applicationId:
            req.params.id

        });



        const internships =

        await Internship.find({

            applicationId:
            req.params.id

        });



        res.render(

            'AdminSingleApplicationView',

            {
                application,
                companies,
                internships
            }

        );

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});



/* ======================================================
   PREVIEW DOCUMENT
====================================================== */

router.get(
'/preview/:filename',
isLoggedIn,

(req,res)=>{

    try{

        if(
            !req.session.user ||
            req.session.user.role !== 'admin'
        ){

            return res.redirect('/auth');

        }



        const filename =
        req.params.filename;



        const filePath =

        path.join(
            __dirname,
            '../uploads',
            filename
        );



        if(
            !fs.existsSync(filePath)
        ){

            return res.send(
                'File Not Found'
            );

        }



        res.sendFile(filePath);

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});



/* ======================================================
   DOWNLOAD DOCUMENT
====================================================== */

router.get(
'/download/:filename',
isLoggedIn,

(req,res)=>{

    try{

        if(
            !req.session.user ||
            req.session.user.role !== 'admin'
        ){

            return res.redirect('/auth');

        }



        const filename =
        req.params.filename;



        const filePath =

        path.join(
            __dirname,
            '../uploads',
            filename
        );



        if(
            !fs.existsSync(filePath)
        ){

            return res.send(
                'File Not Found'
            );

        }



        res.download(filePath);

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});



/* ======================================================
   ACCEPT APPLICATION
====================================================== */

router.post(
'/application/accept/:id',
isLoggedIn,

async(req,res)=>{

    try{

        await Application.findByIdAndUpdate(

            req.params.id,

            {
                status:'accepted'
            }

        );



        res.redirect(

            '/admin/application/' +
            req.params.id

        );

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});



/* ======================================================
   REJECT APPLICATION
====================================================== */

router.post(
'/application/reject/:id',
isLoggedIn,

async(req,res)=>{

    try{

        await Application.findByIdAndUpdate(

            req.params.id,

            {
                status:'rejected'
            }

        );



        res.redirect(

            '/admin/application/' +
            req.params.id

        );

    }catch(error){

        console.log(error);

        res.send(
            'Server Error'
        );

    }

});


router.get('/jobs',
    isLoggedIn,
    async (req, res) => {
        const job = await Job.find();
        res.render('AdminJobAdd', { jobs: job });
    }
);

router.get('/jobadd', isLoggedIn, async (req, res) => {
    res.render('AdminJobAddPage');
});


router.post('/add-job', isLoggedIn, async (req, res) => {
    const lastJob = await Job.findOne().sort({id:-1});

    let newId = 1;

        if(lastJob){

            newId =
            lastJob.id + 1;

        }

    await Job.create({

            id:newId,

            title:
            req.body.title,

            qualification:
            req.body.qualification,

            location:
            req.body.location,

            lastDate:
            req.body.lastDate,

            status:
            req.body.status,

            description:
            req.body.description

    });

    res.redirect('/admin/jobs');
})


router.post('/jobs/update/:id', isLoggedIn, async (req, res) => {

    await Job.findOneAndUpdate(

        { _id: req.params.id },

         {

            title:
            req.body.title,

            qualification:
            req.body.qualification,

            location:
            req.body.location,

            lastDate:
            req.body.lastDate,

            status:
            req.body.status,

            description:
            req.body.description

    });

    res.redirect('/admin/jobs');
})


router.get('/jobedit/:id', isLoggedIn, async (req, res) => {
    const job = await Job.findById(req.params.id);
    res.render('AdminJobEdit', { job });
});

router.get('/jobdelete/:id', isLoggedIn, async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.redirect('/admin/jobs');
});


module.exports = router;