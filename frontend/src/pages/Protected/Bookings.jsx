import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "../../components";
import { setLastRoute } from "../../store/routeSlice";

function Bookings() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Update last route to /bookings
    dispatch(setLastRoute("/bookings"));

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/booking/get-bookings");
        if (response.data.success) {
          setBookings(response.data.data.bookings);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [dispatch]);

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    // Convert UTC time to IST (Indian Standard Time) for display
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    // Convert UTC date to IST for display
    return date.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long", 
      day: "numeric",
    });
  };



  const parseSeats = (seatsBooked) => {
    // Handle comma-separated seats in legacy format
    if (seatsBooked.length === 1 && seatsBooked[0].includes(',')) {
      return seatsBooked[0].split(',').map(seat => seat.trim());
    }
    return seatsBooked;
  };

  if (loading) {
    return <Loading />;
  }

  if (bookings.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Bookings Found</h2>
          <p className="text-gray-500">You haven't made any bookings yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {bookings.map((booking) => {
          const movieTitle = booking.show.movieId?.name || "Unknown Movie";
          const cinemaName = booking.show.cinemaName || "Unknown Cinema";
          const screenNumber = booking.show.screenNumber || "N/A";
          const city = booking.show.city || "Unknown City";
          const userSeats = parseSeats(booking.seatsBooked);
          
          return (
            <div 
              key={booking._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {movieTitle}
                  </h3>
                  
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p>
                      <span className="font-medium">Cinema:</span> {cinemaName}
                    </p>
                    <p>
                      <span className="font-medium">City:</span> {city.charAt(0).toUpperCase() + city.slice(1)}
                    </p>
                    <p>
                      <span className="font-medium">Screen:</span> {screenNumber}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span> {formatDate(booking.show.showtime)}
                    </p>
                    <p>
                      <span className="font-medium">Time:</span> {formatTime(booking.show.showtime)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Your Seats
                    </p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {userSeats.map((seat, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Booking ID: {booking._id}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Bookings;
