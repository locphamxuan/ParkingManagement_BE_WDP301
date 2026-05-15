const User = require('../models/User');
const AppError = require('../utils/AppError');
const { signToken } = require('../utils/token');
const { ROLES } = require('../constants/roles');

const toPublicUser = (user) => user.toJSON();

const buildAuthResponse = (user) => ({
  token: signToken(user._id),
  user: toPublicUser(user),
});

const register = async (body) => {
  const exists = await User.exists({ email: body.email });
  if (exists) {
    throw new AppError('Email already registered', 409);
  }

  const user = await User.create({
    email: body.email,
    password: body.password,
    fullName: body.fullName,
    phone: body.phone,
    role: ROLES.USER,
  });

  return buildAuthResponse(user);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }
  if (!user.isActive) {
    throw new AppError('Account is deactivated', 403);
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  return buildAuthResponse(user);
};

const getProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError('User not found', 404);
  return toPublicUser(user);
};

module.exports = { register, login, getProfile };
