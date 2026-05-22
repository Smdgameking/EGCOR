const express = require('express');

const router = express.Router();

const multer = require('multer');

const path = require('path');

const fs = require('fs');

const isLoggedIn = require('../middlewares/isLoggedIn');


 


/* ================= STORAGE CONFIG ================= */

const storage = multer.diskStorage({


    /* WHERE TO SAVE */

    destination: function(req, file, cb){

        cb(null, 'uploads/');

    },



    /* TEMP FILE NAME */

    filename: function(req, file, cb){

        const uniqueName =

        Date.now()

        +

        path.extname(
            file.originalname
        );


        cb(null, uniqueName);

    }

});





/* ================= FILE FILTER ================= */

const fileFilter = (req, file, cb)=>{


    /* ALLOWED FILE TYPES */

    const allowedTypes =

    /jpg|jpeg|png|pdf/;



    /* CHECK FILE EXTENSION */

    const extname =

    allowedTypes.test(

        path.extname(
            file.originalname
        ).toLowerCase()

    );



    /* CHECK MIME TYPE */

    const mimetype =

    allowedTypes.test(
        file.mimetype
    );



    if(extname && mimetype){

        return cb(null, true);

    }


    else{

        cb(

        new Error(

        'Only JPG, PNG and PDF files allowed'

        )

        );

    }

};





/* ================= MULTER ================= */

const upload = multer({

    storage: storage,

    fileFilter: fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});





/* ================= GET PAGE ================= */

router.get(

'/upload',

isLoggedIn,

(req, res)=>{

    res.render('Upload');

});





/* ================= POST ROUTE ================= */

router.post(

'/upload',

isLoggedIn,

/* CATCH ONE FILE */

upload.single('file'),

(req, res)=>{



    /* NORMAL FORM DATA */

    console.log(req.body);



    /* FILE DATA */

    console.log(req.file);




    /* USERNAME */

    const username = req.session.user.username




    /* EXTENSION */

    const extension =

    path.extname(

        req.file.originalname

    );




    /* FINAL FILE NAME */

    const newFileName =

    username

    +

    '_'

    +

    req.file.fieldname

    +

    extension;




    /* OLD PATH */

    const oldPath =

    req.file.path;




    /* NEW PATH */

    const newPath =

    'uploads/' + newFileName;




    /* RENAME FILE */

    fs.renameSync(

        oldPath,

        newPath

    );




    res.send(

    'File Uploaded Successfully 😎🔥'

    );

});



module.exports = router;