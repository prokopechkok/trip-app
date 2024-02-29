import axios from "axios";
const API_KEY = "WQ7J9SJX3H4GNYL2S8HJY9R2T";

// axios.defaults.baseURL =
//   "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const instance = axios.create({
  baseURL:
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
  // headers: { apikey: "WQ7J9SJX3H4GNYL2S8HJY9R2T" },
});

export const forecastFromTo = async (selectedTrip) => {
  const { data } = await instance.get(
    `${selectedTrip.city}/${selectedTrip.startDate}/${selectedTrip.endDate}?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  );
  return data;
};
export const forecastToday = async (city) => {
  const { data } = await instance.get(
    `${city}/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`
  );
  return data;
};
//[city]/[date1]/[date2]?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=json
//[city]/today?unitGroup=metric&include=days&key=YOUR_API_KEY&contentType=json
