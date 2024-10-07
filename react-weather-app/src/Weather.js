import React, { useState } from "react";
import axios from "axios";

export default function Weather(props) {
  let [weather, setWeather] = useState({});
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);

  function showWeather(response) {
    console.log(response.data);
    setLoaded(true);
    setWeather({
      temperature: response.data.temperature,
      condition: response.data.condition,
      wind: response.data.wind,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "22f8da0004607a380oa863e4bc7fdtdd";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }
  function searchCity(event) {
    setCity(event.target.value);
  }
  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Enter a city..."
        onChange={searchCity}
      />
      <input type="submit" value="Search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <p>Temperature: {Math.round(weather.temperature.current)}°C</p>
        <p>Humidity: {weather.temperature.humidity} %</p>
        <p>Description: {weather.condition.description}</p>
        <p>Wind: {weather.wind.speed}km/h</p>
        <img src="weather.condition.icon_url" />
      </div>
    );
  } else {
    return form;
  }
}
