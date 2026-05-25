const express = require('express');
const router = express.Router();
const Application = require('../../../models/application');
const asyncHandler = require('../../../middlewares/asyncHandler');
const { success, error } = require('../../../utils/apiResponse');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.session?.user || req.session.user.role !== 'admin') {
      return error(res, {
        status: 401,
        message: 'Unauthorized. Admin access required.'
      });
    }
    const applications = await Application.find().sort({ createdAt: -1 });
    return success(res, {
      data: applications,
      message: 'Applications retrieved successfully.'
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return error(res, {
        status: 404,
        message: 'Application not found.',
        details: `No application exists with id ${req.params.id}`
      });
    }
    return success(res, { data: application });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.session?.user) {
      return error(res, {
        status: 401,
        message: 'Unauthorized. Login required to submit an application.'
      });
    }
    const payload = {
      ...req.body,
      userId: req.session.user.id,
      documents: req.body.documents || {}
    };
    const application = await Application.create(payload);
    return success(res, {
      data: application,
      message: 'Application created successfully.',
      status: 201
    });
  })
);

module.exports = router;
