require('dotenv').config();

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

const required = ['mongodbUri', 'jwtSecret'];
const missing = required.filter((key) => !env[key]);

if (missing.length) {
  throw new Error(
    `Missing env: ${missing.join(', ')}. Copy .env.example to .env`
  );
}

module.exports = env;
