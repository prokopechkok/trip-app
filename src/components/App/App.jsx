import React, { useEffect, useState } from "react";
import { SearchForm } from "../SearchForm/SearchForm";
import { TripList } from "../TripsList/TripList";
import { AddTripBtn } from "../AddTripBtn/AddTripBtn";
import { WeekForecast } from "../WeekForecast/WeekForecast";
import { TodayForecast } from "../TodayForecast/TodayForecast";
import { nanoid } from "nanoid";
import css from "./App.module.css";

export const App = () => {
  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips
      ? JSON.parse(storedTrips)
      : [
          {
            id: nanoid(5),
            city: "Berlin",
            startDate: "2024-03-06",
            endDate: "2024-03-08",
          },
          {
            id: nanoid(5),
            city: "London",
            startDate: "2024-03-04",
            endDate: "2024-03-08",
          },
          {
            id: nanoid(5),
            city: "Paris",
            startDate: "2024-03-05",
            endDate: "2024-03-10",
          },
        ];
  });
  const [query, setQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(trips[0]);

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    const foundTrip = trips.find(
      (trip) => query.toLowerCase() === trip.city.toLowerCase()
    );

    if (foundTrip) {
      setSelectedTrip(foundTrip);
    }
  }, [query, trips]);

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
  };
  const handleAddTrip = (newTrip) => {
    setTrips([...trips, newTrip]);
  };
  const onHandleFormSubmit = (search) => {
    setQuery(search);
  };

  return (
    <div className={css.app}>
      <div className={css.mainContainer}>
        <h1 className={css.header}>
          Weather <span>Forecast</span>
        </h1>
        <SearchForm onSubmit={onHandleFormSubmit} />
        <div className={css.tripListContainer}>
          <TripList trips={trips} onSelectTrip={handleSelectTrip} />
          <AddTripBtn onAddTrip={handleAddTrip} />
        </div>
        <div className={css.weekContainer}>
          <h2 className={css.subHeader}>Week</h2>
          <WeekForecast trip={selectedTrip} />
        </div>
      </div>
      <div className={css.todayContainer}>
        <TodayForecast trip={selectedTrip} />
      </div>
    </div>
  );
};
