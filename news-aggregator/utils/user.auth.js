
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EnvConfig  = require('../../config');

const comparePassword = async (plainPassword, hashPassword) => {
    try {
        return await bcrypt.compare(plainPassword, hashPassword);
    }
    catch (error) {
        throw error;
    }
}

const hashPassword = async (plainPassword) => {
    try {
        return await bcrypt.hash(plainPassword, parseInt(ServerConfig.SALT_ROUNDS));
    }
    catch (error) {
        throw error;
    }
}
const generateToken = async (payload) => {
    try {
        return jwt.sign(payload, EnvConfig.JWT_SECRET, { expiresIn: EnvConfig.JWT_EXPIRES_IN });
    }
    catch (error) {
        throw error;
    }
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, EnvConfig.JWT_SECRET);
    }
    catch (error) {
        throw error;
    }
}


module.exports = {comparePassword, hashPassword, generateToken, verifyToken}