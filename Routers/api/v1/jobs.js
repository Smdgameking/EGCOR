const express = require('express');
const router = express.Router();
const Job = require('../../../models/Jobs');
const asyncHandler = require('../../../middlewares/asyncHandler');
const { success, error } = require('../../../utils/apiResponse');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return success(res, {
      data: jobs,
      message: 'Job listings retrieved successfully.'
    });
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return error(res, {
        status: 404,
        message: 'Job not found.',
        details: `No job exists with id ${req.params.id}`
      });
    }
    return success(res, { data: job });
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    if (!req.session?.user || req.session.user.role !== 'admin') {
      return error(res, {
        status: 401,
        message: 'Unauthorized. Admin access required.'
      });
    }
    const job = await Job.create(req.body);
    return success(res, {
      data: job,
      message: 'Job created successfully.',
      status: 201
    });
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.session?.user || req.session.user.role !== 'admin') {
      return error(res, {
        status: 401,
        message: 'Unauthorized. Admin access required.'
      });
    }
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!job) {
      return error(res, {
        status: 404,
        message: 'Job not found.',
        details: `No job exists with id ${req.params.id}`
      });
    }
    return success(res, {
      data: job,
      message: 'Job updated successfully.'
    });
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    if (!req.session?.user || req.session.user.role !== 'admin') {
      return error(res, {
        status: 401,
        message: 'Unauthorized. Admin access required.'
      });
    }
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return error(res, {
        status: 404,
        message: 'Job not found.',
        details: `No job exists with id ${req.params.id}`
      });
    }
    return success(res, {
      data: job,
      message: 'Job deleted successfully.'
    });
  })
);

module.exports = router;
