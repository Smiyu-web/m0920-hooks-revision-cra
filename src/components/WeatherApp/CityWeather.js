import React, { useEffect, useState } from "react";
import axios from "axios";

const CityWeather = (props) => {
  // state = {};

  const [icon, setIcon] = useState("");

  // async componentDidMount() {
  //   this.getWeather();
  // }

  // componentDidUpdate(oldProps) {
  //   if (oldProps.cityName !== this.props.cityName) {
  //     this.getWeather();
  //   }
  // }

  useEffect(async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    const res = await axios.get(url);
    setIcon(res.data.weather[0].icon);
  }, [props.cityName]);

  const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

  return (
    <div>
      <h1>{props.cityName}</h1>
      <img src={iconUrl} />
    </div>
  );
};

export default CityWeather;
