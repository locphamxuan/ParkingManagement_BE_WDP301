const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('./AppError');

const signToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch {
    throw new AppError('Invalid or expired token', 401);
  }
};

module.exports = { signToken, verifyToken };
