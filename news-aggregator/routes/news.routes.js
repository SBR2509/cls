const express = require('express');
const router = express.Router();
const NewsController = require('../controller/news.controller');
const { AuthReqMiddleware } = require('../middlewares');

router.get('/',AuthReqMiddleware.checkAuth, NewsController.getNews);

module.exports = router;