import React, { useState } from 'react';
import axios from 'axios';

const WeatherApp = ({ token }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleGetWeather = async () => {
    try {
      const response = await axios.get(`http://localhost:3007/weather/${city}`, {
        headers: { 'x-access-token': token },
      });
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    }
  };

  return (
    <div className="weather-app">
      <h2>weather</h2>
      <div className="weather-input">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleGetWeather}>get</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3>{weather.city}</h3>
          <p>{weather.description}</p>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
