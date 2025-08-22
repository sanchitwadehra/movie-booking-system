import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading, Modal, Button, Select } from "../components";

function Seats() {
  const { showId } = useParams();
  const location = useLocation();
  const { cinemaName, screenNumber, showtime } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [showData, setShowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [numSeats, setNumSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Options for the Select component
  const seatOptions = [
    { key: 1, value: 1, label: "1 Seat" },
    { key: 2, value: 2, label: "2 Seats" },
    { key: 3, value: 3, label: "3 Seats" },
    { key: 4, value: 4, label: "4 Seats" },
    { key: 5, value: 5, label: "5 Seats" },
    { key: 6, value: 6, label: "6 Seats" },
  ];

  useEffect(() => {
    const fetchShowData = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/v1/db/show", { showId });
        if (response.data.success) {
          setShowData(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch show details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchShowData();
  }, [showId]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSeatClick = (seat) => {
    if (showData.seatsBooked.includes(seat)) return;

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      }
      if (prev.length < numSeats) {
        return [...prev, seat];
      }
      return prev;
    });
  };

  const handleSeatNumberChange = (e) => {
    const newNumSeats = parseInt(e.target.value);
    setNumSeats(newNumSeats);
    // Reset selected seats when number of seats changes
    setSelectedSeats([]);
  };

  const renderSeats = () => {
    const rows = 10;
    const cols = 10;
    const seats = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const seatId = `${String.fromCharCode(65 + i)}${j + 1}`;
        const isBooked = showData.seatsBooked.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        seats.push(
          <div
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md cursor-pointer transition-colors
              ${isBooked ? "bg-red-500 cursor-not-allowed" : ""}
              ${isSelected ? "bg-green-500" : ""}
              ${
                !isBooked && !isSelected
                  ? "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  : ""
              }
            `}
          >
            {seatId}
          </div>
        );
      }
    }
    return seats;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 w-full flex flex-col items-center">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">How many seats?</h2>
          <div className="flex justify-center items-center gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => {
                  setNumSeats(num);
                  setIsModalOpen(false);
                }}
                className={numSeats === num ? "bg-blue-800" : ""}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>
      </Modal>

      {showData && (
        <>
          <h2 className="text-3xl font-bold mb-2">{showData.movieId.name}</h2>
          {cinemaName && screenNumber && (
            <p className="text-lg text-gray-500 mb-6">
              {cinemaName} - Screen {screenNumber}
              {showtime && ` - ${formatTime(showtime)}`}
            </p>
          )}

          {/* Seat selection dropdown */}
          <div className="mb-6 flex items-center gap-4">
            <label htmlFor="seat-selector" className="text-lg font-medium">
              Number of seats:
            </label>
            <div className="w-40">
              <Select
                id="seat-selector"
                options={seatOptions}
                value={numSeats}
                onChange={handleSeatNumberChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-10 gap-2 mb-8">{renderSeats()}</div>

          {selectedSeats.length === numSeats && (
            <Button className="w-1/2 bg-green-600 hover:bg-green-700">
              Pay Now
            </Button>
          )}
        </>
      )}
    </div>
  );
}

export default Seats;
