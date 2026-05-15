const sendSuccess = (res, { statusCode = 200, message, data } = {}) => {
  const payload = { success: true };
  if (message) payload.message = message;
  if (data !== undefined) payload.data = data;
  res.status(statusCode).json(payload);
};

module.exports = { sendSuccess };
