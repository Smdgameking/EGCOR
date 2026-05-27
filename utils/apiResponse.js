exports.success = (res, { data = null, message = 'Success', status = 200 } = {}) => {
  return res.status(status).json({
    status: 'success',
    message,
    data
  });
};

exports.error = (res, { message = 'Error', details = null, status = 500 } = {}) => {
  return res.status(status).json({
    status: 'error',
    message,
    details
  });
};