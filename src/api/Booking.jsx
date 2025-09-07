import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../bp.css";

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Example seat layout like BookMyShow
  const sections = [
    {
      price: 350,
      label: "₹350 RECLINER",
      rows: ["A", "B"],
      cols: 10,
    },
    {
      price: 150,
      label: "₹150 CLASSIC",
      rows: ["C", "D", "E", "F"],
      cols: 16,
    },
  ];

  const bookedSeats = ["A3", "B5", "C10", "D11"]; // example pre-booked

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // can't select booked seats

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => {
    const section = sections.find((sec) =>
      sec.rows.includes(seat[0])
    );
    return section ? sum + section.price : sum;
  }, 0);

  return (
    <div className="booking-page">
      <h1>Seat Layout</h1>
      <p>Movie ID: {id}</p>

      {/* Screen */}
      <div className="screen">SCREEN THIS WAY</div>

      {/* Sections */}
      {sections.map((section, idx) => (
        <div key={idx} className="section">
          <h3>{section.label}</h3>
          {section.rows.map((row) => (
            <div key={row} className="row">
              <span className="row-label">{row}</span>
              <div className="seat-block">
                {Array.from({ length: section.cols }).map((_, colIdx) => {
                  const seat = `${row}${colIdx + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  const isBooked = bookedSeats.includes(seat);

                  return (
                    <div
                      key={seat}
                      className={`seat ${isSelected ? "selected" : ""} ${
                        isBooked ? "booked" : ""
                      }`}
                      onClick={() => toggleSeat(seat)}
                    >
                      {colIdx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="legend">
        <div>
          <span className="legend-item available"></span> Available
        </div>
        <div>
          <span className="legend-item selected"></span> Selected
        </div>
        <div>
          <span className="legend-item booked"></span> Sold
        </div>
      </div>

      {/* Summary */}
      <div className="summary">
        <h3>Selected Seats: {selectedSeats.join(", ") || "None"}</h3>
        <h3>Total: ₹{totalPrice}</h3>
        <button
          className="btn-confirm"
          disabled={!selectedSeats.length}
          onClick={() => navigate("/scan")}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default BookingPage;
