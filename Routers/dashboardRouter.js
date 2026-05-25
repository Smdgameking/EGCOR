const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');

const Job = require('../models/Jobs');



router.get(

'/dashboard',

async (req, res)=>{

    const job = await Job.find();
    res.render(

    'Userdashboard',

    {

        user:

        req.session.user
        ?
        req.session.user
        :
        null,

        jobs: job
    }

);

});



module.exports = router;