import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setRegion } from "../store/regionSlice";
import { setCinemaData } from "../store/cinemaSlice";
import { Loading, Modal, Button, Select } from "../components";

function Cinemas() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { regionData } = useSelector((state) => state.region);
  const { cinemas: cinemasData } = useSelector((state) => state.cinema);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(!regionData);
  const [selectedDate, setSelectedDate] = useState(() => {
    // Default to today's date
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  });

  const handleRegionSelect = (city) => {
    dispatch(setRegion(city));
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCinemas = async () => {
      if (!regionData || !selectedDate) return;

      const normalizedRegion = regionData.trim().toLowerCase();
      setLoading(true);
      const toastId = toast.loading(`Fetching cinemas in ${regionData} for ${selectedDate}...`);

      try {
        const response = await axios.post("/api/v1/db/screens", {
          city: normalizedRegion,
          movieId: movieId,
          date: selectedDate,
        });

        if (response.data.success) {
          dispatch(setCinemaData(response.data.data));
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch cinemas");
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    };

    fetchCinemas();
  }, [regionData, movieId, selectedDate, dispatch]);

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

  const handleShowClick = (showId, cinemaName, screenNumber, showtime) => {
    navigate(`/seats/${showId}`, { state: { cinemaName, screenNumber, showtime } });
  };

  return (
    <div className="p-6 w-full">
      <Modal isOpen={isModalOpen} onClose={() => {}}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Select Your City</h2>
          <div className="flex justify-center gap-4">
            <Button onClick={() => handleRegionSelect("Chandigarh")}>
              Chandigarh
            </Button>
            <Button onClick={() => handleRegionSelect("Mohali")}>Mohali</Button>
          </div>
        </div>
      </Modal>

      {!isModalOpen && (
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Region:</h2>
            <Select
              options={[
                { key: "chd", value: "Chandigarh", label: "Chandigarh" },
                { key: "moh", value: "Mohali", label: "Mohali" },
              ]}
              value={regionData}
              onChange={(e) => handleRegionSelect(e.target.value)}
              className="w-48"
            />
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Date:</h2>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
              className="px-3 py-2 rounded-md 
                bg-gray-100 dark:bg-gray-700 
                text-black dark:text-white 
                border border-gray-950 dark:border-gray-200
                outline-none 
                focus:bg-gray-50 dark:focus:bg-gray-800
                focus:border-blue-500 dark:focus:border-blue-600
                duration-200 w-48"
            />
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loading />
        </div>
      ) : (
        <div className="space-y-8">
          {cinemasData.length > 0 ? (
            cinemasData.map((cinema) => (
              <div
                key={cinema._id}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-2xl font-bold mb-4">{cinema.name}</h3>
                <div className="flex flex-wrap gap-4">
                  {cinema.screens
                    .flatMap((screen) =>
                      screen.shows.map((show) => ({
                        ...show,
                        screenNumber: screen.screenNumber,
                      }))
                    )
                    .sort((a, b) => new Date(a.showtime) - new Date(b.showtime))
                    .map((show) => (
                      <Button
                        key={show._id}
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          handleShowClick(
                            show._id,
                            cinema.name,
                            show.screenNumber,
                            show.showtime
                          )
                        }
                      >
                        {formatTime(show.showtime)}
                      </Button>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">
              No shows available for this movie in {regionData} on {selectedDate}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cinemas;
