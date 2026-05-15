const AppError = require('../utils/AppError');

const authorize =
  (...roles) =>
  (req, _res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden', 403));
    }
    next();
  };

module.exports = { authorize };
