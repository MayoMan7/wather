// WeatherApp.js
import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '7e8bbf4da48444d086341245240901';
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4`;

  const getWeather = () => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Weather Forecast Data:', data);
        setWeatherData(data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error.message);
      });
  };

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
      <label>
        Enter City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button onClick={getWeather}>Get Weather</button>

      {weatherData && weatherData.current ? (
        <div className="weather-container">
          <div className="left-column">
            <h3>Today's Weather in {city}</h3>
            <p>Date/Time: {weatherData.location.localtime}</p>
            <p>Temperature: {weatherData.current.temp_f}°F</p>
            {weatherData.current.condition && (
              <div>
                <p>Condition: {weatherData.current.condition.text}</p>
                <img
                  src={weatherData.current.condition.icon}
                  alt={weatherData.current.condition.text}
                />
              </div>
            )}
            <p>Wind Speed: {weatherData.current.wind_mph} mph</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
          </div>

          <div className="right-column">
            <div className="top-right">
              <h3>Astrological Information</h3>
              <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
              <p>Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
              <p>Moon Phase: {weatherData.forecast.forecastday[0].astro.moon_phase}</p>
            </div>

            <div className="bottom-right">
              <h3>Temperature Forecast for the Next 2 Days</h3>
              {weatherData.forecast && weatherData.forecast.forecastday
                ? weatherData.forecast.forecastday.slice(1, 4).map(day => (
                    <div key={day.date}>
                      <p>
                        {day.date}: {day.day.avgtemp_f}°F
                        {day.day.condition && (
                          <img
                            src={day.day.condition.icon}
                            alt={day.day.condition.text}
                            title={day.day.condition.text}
                            style={{ marginLeft: '10px', verticalAlign: 'middle' }}
                          />
                        )}
                      </p>
                    </div>
                  ))
                : <p>Forecast data not available</p>
              }
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherApp;
