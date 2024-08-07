// next.config.js
const dotenv = require('dotenv');
const path = require('path');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

module.exports = {
  env: {
    API_URL: process.env.API_URL,
  },
};
