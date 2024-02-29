import React from "react";
import css from "./TripCard.module.css";
import berlinImage from "../../images/berlin.jpg";
import londonImage from "../../images/london.jpg";
import parisImage from "../../images/paris.jpg";
import amsterdamImage from "../../images/amsterdam.jpg";
import lisbonImage from "../../images/lisbon.jpg";
import chicagoImage from "../../images/chicago.jpg";
import wienImage from "../../images/wien.jpg";
import pragueImage from "../../images/prague.jpg";

export const cities = [
  { name: "Amsterdam", image: amsterdamImage },
  { name: "London", image: londonImage },
  { name: "Paris", image: parisImage },
  { name: "Berlin", image: berlinImage },
  { name: "Lisbon", image: lisbonImage },
  { name: "Chicago", image: chicagoImage },
  { name: "Wien", image: wienImage },
  { name: "Prague", image: pragueImage },
];
export const TripCard = ({ trip }) => {
  const city = cities.find(
    (city) => city.name.toLowerCase().trim() === trip.city.toLowerCase().trim()
  );
  if (!city) {
    return null;
  }
  return (
    <div className={css.card}>
      <img src={city.image} alt={city.name} width="200" className={css.image} />
      <div className={css.text}>
        <h3>{trip.city}</h3>
        <p>
          {trip.startDate} - {trip.endDate}
        </p>
      </div>
    </div>
  );
};
