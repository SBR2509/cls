
const { StatusCodes } = require('http-status-codes');
const UserService = require('../services/user.service');
const { ErrorResponse, SuccessResponse } = require("../utils/common");
//const { UserAuth } = require("../utils/common");
const { NewsAPIConfig } = require('../config');
const { default: axios } = require('axios');
const userService = new UserService();

const getNews = async (req, res) => {
    try {
        const loggedInUser = await userService.isAuthenticated(req.headers['x-access-token']);
        const preferences = await userService.getUserNewsPreferences(loggedInUser);
        const randomPreference = preferences[Math.floor(Math.random() * preferences.length)];
        const params= {
            apiKey: NewsAPIConfig.NEWS_API_KEY,
            q: randomPreference, 
        };
        console.log(params)
        const response = await axios.get(NewsAPIConfig.NEWS_API_URL, { params });
        SuccessResponse.data = response.data.articles;
        SuccessResponse.message = "News Fetched Successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}




module.exports = {
    getNews
}