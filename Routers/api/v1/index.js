const express = require('express');
const router = express.Router();

const jobsApi = require('./jobs');
const applicationsApi = require('./applications');

router.use('/jobs', jobsApi);
router.use('/applications', applicationsApi);

module.exports = router;
