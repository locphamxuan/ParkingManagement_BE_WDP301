const mongoose = require('mongoose');
const env = require('./env');

const connectDB = async () => {
  const conn = await mongoose.connect(env.mongodbUri);
  console.log(`[MongoDB] ${conn.connection.host} / ${conn.connection.name}`);
};

module.exports = connectDB;
