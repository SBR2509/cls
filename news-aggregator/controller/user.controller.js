const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/user.service');
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { UserAuth } = require("../utils/user.auth");

const userService = new UserService();

const signupUser = async (req, res) => {
    try {
        const { username, email, password, preferences } = req.body;
        const hashPassword = await UserAuth.hashPassword(password);
        const user = await userService.signUp({ username, email, password: hashPassword, preferences });
        SuccessResponse.data = user;
        SuccessResponse.message = "User created successfully";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        console.log('error.statusCode', error.statusCode);
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

const loginUser = async (req, res) => {
    try {
        const data = req.body;
        const user = await userService.signIn(data);
        SuccessResponse.data = user;
        SuccessResponse.message = "User logged in successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);
        SuccessResponse.data = user;
        SuccessResponse.message = "User fetched successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

const getNewsPreferences = async (req, res) => {
    try {

        const loggedInUser = await userService.isAuthenticated(req.headers['x-access-token']);
        const preferences = await userService.getNewsPreferences(loggedInUser);
        console.log('preferences', preferences)
        SuccessResponse.data = preferences;
        SuccessResponse.message = "User News Preferences Fetched Successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

const updateNewsPreferences = async (req, res) => {
    try {
        console.log(req.body)
        const loggedInUser = await userService.isAuthenticated(req.headers['x-access-token']);
        console.log('loggedInUser',loggedInUser)
        const preferences = await userService.updateNewsPreferences(loggedInUser, req.body);

        SuccessResponse.data = preferences;
        SuccessResponse.message = "User News Preferences Updated Successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


module.exports = { signupUser, loginUser, getUserByUsername, getNewsPreferences, updateNewsPreferences }