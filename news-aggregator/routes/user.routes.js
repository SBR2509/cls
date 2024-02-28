const express = require('express');
const UserController = require('../controller/user.controller');
const NewsController = require('../controller/news.controller');
const { AuthReqMiddleware, ValidateUserReqMiddleware } = require('../middlewares');
const router = express.Router();

router.post('/register', ValidateUserReqMiddleware.validateSignUpReq, UserController.signupUser);
router.post('/login', ValidateUserReqMiddleware.validateSignInReq, UserController.loginUser);
router.get('/preferences', AuthReqMiddleware.checkAuth, UserController.getNewsPreferences);
router.put('/preferences', AuthReqMiddleware.checkAuth, UserController.updateNewsPreferences);
router.get('/:username', AuthReqMiddleware.checkAuth, UserController.getUserByUsername);

module.exports = router;