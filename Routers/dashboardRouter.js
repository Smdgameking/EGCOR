const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');



router.get(

'/dashboard',

(req, res)=>{


    res.render(

    'Userdashboard',

    {

        user:

        req.session.user
        ?
        req.session.user
        :
        null,



        totalApplications: 10,



        totalNotifications: 5,



        latestNotification: {

            title:

            'New Recruitment Released',


            message:

            'Village Revenue Officer applications started.'

        },



        news: [

            {

                title:

                'Hall Tickets Released',


                category:

                'Exam',


                description:

                'Junior Assistant hall tickets officially released.',


                date:

                '20 May 2026'

            }

        ],



        jobs: [

            {

                _id: 1,

                title:

                'Junior Assistant',


                status:

                'Active',


                description:

                'Government office role.',


                qualification:

                'Degree',


                lastDate:

                '25 June 2026',


                location:

                'Hyderabad'

            }

        ]

    }

);

});



module.exports = router;