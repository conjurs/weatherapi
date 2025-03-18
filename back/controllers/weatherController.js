const axios = require('axios');
const { apiKey } = require('../utils/constants');
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../data/weatherCache.json');
const CACHE_EXPIRATION = 10 * 60 * 1000; //10 minutit

const ensureCacheDirectory = () => {
  const cacheDir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }
};

const loadCache = () => {
  ensureCacheDirectory();
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    }
  } catch (error) {
    console.error('Error loading cache file:', error);
  }
  return {};
};

const saveCache = (cache) => {
  ensureCacheDirectory();
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.error('Error saving cache to file:', error);
  }
};

const extractWeatherData = (weatherData) => {
  return {
    city: weatherData.name,
    description: weatherData.weather[0].description,
    temperature: weatherData.main.temp,
    windSpeed: weatherData.wind.speed,
    formattedDisplay: `${weatherData.name}
${weatherData.weather[0].description}

Temperature: ${weatherData.main.temp}°C

Wind Speed: ${weatherData.wind.speed} m/s`
  };
};

exports.getWeatherByCity = async (req, res) => {
  const city = req.params.city;
  console.log('Received weather request for city:', city);
  
  const cache = loadCache();
  
  if (cache[city] && cache[city].timestamp > Date.now() - CACHE_EXPIRATION) {
    console.log('Returning cached data for city:', city);
    return res.send(cache[city].data);
  }

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    console.log('Weather API response:', response.data);
    
    const essentialData = extractWeatherData(response.data);
    
    cache[city] = {
      data: essentialData,
      timestamp: Date.now()
    };
    saveCache(cache);
    
    res.send(essentialData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    res.status(500).send({ message: 'Error retrieving weather data' });
  }
};
