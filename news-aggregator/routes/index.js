const express = require('express');

const userRoutes = require('./user.routes');
const newsRoutes = require('./news.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/news', newsRoutes);


module.exports = router;