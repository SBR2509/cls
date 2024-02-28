const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 4000,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 9,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    JWT_SECRET: process.env.JWT_SECRET || 'hello,world',
};