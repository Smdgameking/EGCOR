const express = require('express')
const router = express.Router();

router.get(

"/dashboard",

(req, res) => {

    res.render(

        "Userdashboard",

        {

            user: {

                fullname: {

                    firstname:
                    "Architect"

                },

                profileImage:
                "https://i.pravatar.cc/100"

            },

            totalApplications: 10,

            totalHallTickets: 20,

            totalResults: 200,

            totalNotifications: 500,

            latestNotification: {

                title:
                "Hall Tickets Released",

                message:
                "Junior Assistant hall tickets released."

            },

            jobs: [

                {

                    _id: 1,

                    title:
                    "Junior Assistant",

                    status:
                    "Active",

                    description:
                    "Government office role.",

                    qualification:
                    "Degree",

                    lastDate:
                    "25 June 2026",

                    location:
                    "Hyderabad"

                },
                {

                    _id: 2,

                    title:
                    "Data Entry Operator",

                    status:
                    "Active",

                    description:
                    "Government office role.",

                    qualification:
                    "Degree",

                    lastDate:
                    "25 June 2026",

                    location:
                    "Hyderabad"

                }


            ]

        }

    );

});

module.exports = router