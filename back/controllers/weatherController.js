const axios = require('axios');
const { apiKey } = require('../utils/constants');

exports.getWeatherByCity = async (req, res) => {
  const city = req.params.city;

  console.log('Received weather request for city:', city); 

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    console.log('Weather API response:', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).send({ message: 'Error retrieving weather data' });
  }
};
