const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:city', verifyToken, weatherController.getWeatherByCity);

module.exports = router;