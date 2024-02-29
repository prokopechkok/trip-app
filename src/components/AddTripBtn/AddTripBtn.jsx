import { nanoid } from "nanoid";
import { useState } from "react";
import { cities } from "../TripCard/TripCard";
import css from "./AddTripBtn.module.css";

export const AddTripBtn = ({ onAddTrip }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewTrip({ city: "", startDate: "", endDate: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTrip.city.trim() || !newTrip.startDate || !newTrip.endDate) {
      alert("Please fill in all fields");
      return;
    }
    onAddTrip({ ...newTrip, id: nanoid(5) });
    closeModal();
  };
  return (
    <>
      <button
        type="button"
        data-modal-open
        onClick={openModal}
        className={css.button}
      >
        <div>
          <p>+</p>
          Add trip
        </div>
      </button>
      {showModal && (
        <div className={css.modalWrapper}>
          <div className={css.backdrop}>
            <div className={css.modal}>
              <div className={css.modalContent}>
                <button
                  type="button"
                  className={css.close}
                  onClick={closeModal}
                >
                  &times;
                </button>
                <h2 className={css.modalTitle}>Create trip</h2>
                <form onSubmit={handleSubmit} className={css.form}>
                  <div className={css.field}>
                    <label htmlFor="city">City:</label>
                    <select
                      id="city"
                      name="city"
                      onChange={handleChange}
                      className={css.input}
                      required
                    >
                      <option value="">Select a city</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={css.field}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className={css.input}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={css.field}>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className={css.input}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={css.btnWrapper}>
                    <button type="submit" className={css.formBtn}>
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className={css.formBtn}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
