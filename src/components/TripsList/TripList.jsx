import React, { useState } from "react";
import { TripCard } from "../TripCard/TripCard";
import css from "./TripList.module.css";
const itemsPerPage = 3;
export const TripList = ({ trips, onSelectTrip }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTrips = trips
    .slice()
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTrips = sortedTrips.slice(startIndex, endIndex);

  const nextPage = () => {
    if (endIndex < sortedTrips.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className={css.tripList}>
      <ul className={css.list}>
        {currentTrips.map((trip) => (
          <li key={trip.id} onClick={() => onSelectTrip(trip)}>
            <TripCard trip={trip} />
          </li>
        ))}
      </ul>
      <div className={css.pageBtns}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          &#706;
        </button>
        <button onClick={nextPage} disabled={endIndex >= sortedTrips.length}>
          &#707;
        </button>
      </div>
    </div>
  );
};
