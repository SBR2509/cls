
const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/user.service');

async function checkAuth(req, res, next) {
    try {
        const userService = new UserService();
        const response = await userService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch (error) {
        console.log(error)
        return res
            .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
            .json(error);
    }

}

module.exports = { checkAuth }