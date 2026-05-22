const express = require('express');

const router = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');



router.get(

'/dashboard',

(req, res)=>{


    res.render(

    'Userdashboard',

    {

        /* USER */

        user: {

            fullname: {

                firstname: 'Architect'

            },

            profileImage:

            'https://i.pravatar.cc/100'

        },



        /* STATS */

        totalApplications: 10,

        totalNotifications: 5,



        /* HERO NOTIFICATION */

        latestNotification: {

            title:

            'New Recruitment Released',

            message:

            'Village Revenue Officer applications started.'

        },



        /* NEWS */

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

            },



            {

                title:

                'New Recruitment Notification',


                category:

                'Recruitment',


                description:

                'Applications started for revenue department jobs.',


                date:

                '22 May 2026'

            },
            {

                title:

                'NIC training Admitions are Open',


                category:

                'Admitions',


                description:

                'NIC training Admitions are Opened',


                date:

                '22 May 2026'

            }

        ],



        /* JOBS */

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

            },



            {

                _id: 2,

                title:

                'Data Entry Operator',


                status:

                'Active',


                description:

                'Typing and office management role.',


                qualification:

                '12th Pass',


                lastDate:

                '28 June 2026',


                location:

                'Hyderabad'

            },
            {
                _id: 3,

                title:

                'Web developer',


                status:

                'Active',


                description:

                'Coding and backened management role.',


                qualification:

                '12th Pass/Diploma pass',


                lastDate:

                '28 June 2026',


                location:

                'Kakinada'
            }

        ]

    }

);

});



module.exports = router;