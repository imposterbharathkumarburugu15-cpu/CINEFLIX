// src/pages/BookingPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../bp.css";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = 6; // number of rows
  const cols = 10; // seats per row
  const seatPrice = 150; // per seat ₹

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.length * seatPrice;

  return (
    <div className="booking-page">
      <h1> Seat Booking</h1>
      <p>Movie ID: {id}</p>

      {/* Screen */}
      <div className="screen"> SCREEN</div>

      {/* Seat Grid */}
      <div className="seats-grid">
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: cols }).map((_, col) => {
              const seat = `${String.fromCharCode(65 + row)}${col + 1}`;
              const isSelected = selectedSeats.includes(seat);

              return (
                <div
                  key={seat}
                  className={`seat ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seat)}
                >
                  {seat}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="summary">
        <h3>Selected Seats: {selectedSeats.join(", ") || "None"}</h3>
        <h3>Total: ₹{totalPrice}</h3>
        <button 
          className="btn-confirm" 
          disabled={!selectedSeats.length}
          onClick={() => navigate('/scan')}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
