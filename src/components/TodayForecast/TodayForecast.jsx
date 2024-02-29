import React, { useEffect, useState } from "react";
import { forecastToday } from "../../services/api";
import { icons } from "../WeekForecast/WeekForecast";
import css from "./TodayForecast.module.css";

let selectedDate;

export const TodayForecast = ({ trip }) => {
  const [today, setToday] = useState({});

  useEffect(() => {
    const fetchTodayForecast = async () => {
      try {
        const { days } = await forecastToday(trip.city);
        setToday(days[0]);
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
      }
    };
    fetchTodayForecast();
  }, [trip]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const refs = {
        daysSpan: document.querySelector("[data-days]"),
        hoursSpan: document.querySelector("[data-hours]"),
        minutesSpan: document.querySelector("[data-minutes]"),
        secondsSpan: document.querySelector("[data-seconds]"),
      };
      const currentDate = new Date();
      selectedDate = new Date(trip.startDate);

      const timeLeftObj = convertMs(selectedDate - currentDate);

      refs.daysSpan.textContent = addLeadingZero(timeLeftObj.days);
      refs.hoursSpan.textContent = addLeadingZero(timeLeftObj.hours);
      refs.minutesSpan.textContent = addLeadingZero(timeLeftObj.minutes);
      refs.secondsSpan.textContent = addLeadingZero(timeLeftObj.seconds);
      if (
        !timeLeftObj.days &&
        !timeLeftObj.hours &&
        !timeLeftObj.minutes &&
        !timeLeftObj.seconds
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
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
  const dayOfWeek = daysOfWeek[new Date(today.datetime).getDay()];

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
  }
  const icon = today.icon?.split("-").join("");
  return (
    <div className={css.container}>
      <div className={css.dayForecast}>
        <h2 className={css.day}>{dayOfWeek}</h2>
        <div className={css.info}>
          <div className={css.inline}>
            <img src={icons[icon]} alt={today.icon} />
            <p className={css.temp}>{Math.round(today.temp)}°</p>
          </div>
          <h3 className={css.city}>{trip.city}</h3>
        </div>
        <div className={css.timer}>
          <div className={css.field}>
            <span className={css.value} data-days>
              00
            </span>
            <span className={css.label}>Days</span>
          </div>
          <div className={css.field}>
            <span className={css.value} data-hours>
              00
            </span>
            <span className={css.label}>Hours</span>
          </div>
          <div className={css.field}>
            <span className={css.value} data-minutes>
              00
            </span>
            <span className={css.label}>Minutes</span>
          </div>
          <div className={css.field}>
            <span className={css.value} data-seconds>
              00
            </span>
            <span className={css.label}>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};
