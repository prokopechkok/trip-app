import React, { useEffect, useState } from "react";
import { forecastFromTo } from "../../services/api";

import rain from "../../images/icons/rain.png";
import clearday from "../../images/icons/clear-day.png";
import clearnight from "../../images/icons/clear-night.png";
import cloudy from "../../images/icons/cloudy.png";
import fog from "../../images/icons/fog.png";
import hail from "../../images/icons/hail.png";
import partlycloudyday from "../../images/icons/partly-cloudy-day.png";
import partlycloudynight from "../../images/icons/partly-cloudy-night.png";
import rainsnow from "../../images/icons/rain-snow.png";
import rainsnowshowersday from "../../images/icons/rain-snow-showers-day.png";
import rainsnowshowersnight from "../../images/icons/rain-snow-showers-night.png";
import showersday from "../../images/icons/showers-day.png";
import showersnight from "../../images/icons/showers-night.png";
import sleet from "../../images/icons/sleet.png";
import snow from "../../images/icons/snow.png";
import snowshowersday from "../../images/icons/snow-showers-day.png";
import snowshowersnight from "../../images/icons/snow-showers-night.png";
import thunder from "../../images/icons/thunder.png";
import thunderrain from "../../images/icons/thunder-rain.png";
import thundershowersday from "../../images/icons/thunder-showers-day.png";
import thundershowersnight from "../../images/icons/thunder-showers-night.png";
import wind from "../../images/icons/wind.png";
import css from "./WeekForecast.module.css";
export const icons = {
  rain,
  clearday,
  clearnight,
  wind,
  thundershowersnight,
  thundershowersday,
  thunderrain,
  thunder,
  snowshowersnight,
  snowshowersday,
  snow,
  sleet,
  showersnight,
  showersday,
  rainsnowshowersnight,
  rainsnowshowersday,
  rainsnow,
  partlycloudynight,
  partlycloudyday,
  hail,
  fog,
  cloudy,
};
export const WeekForecast = ({ trip }) => {
  const [weatherForecast, setWeatherForecast] = useState([]);
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const { days } = await forecastFromTo(trip);
        setWeatherForecast(days);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    };

    fetchWeatherForecast();
  }, [trip]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <ul className={css.list}>
      {weatherForecast.map((day, index) => {
        const dayOfWeek = daysOfWeek[new Date(day.datetime).getDay()];
        const icon = day.icon.split("-").join("");
        return (
          <div key={index} className={css.dayCard}>
            <p className={css.weekDay}>{dayOfWeek}</p>
            <img src={icons[icon]} alt={day.icon} className={css.image} />
            <p className={css.temp}>
              {Math.round(day.tempmax)}° / {Math.round(day.tempmin)}°
            </p>
          </div>
        );
      })}
    </ul>
  );
};
