import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Cinema } from "../models/cinema.model.js";
import { Screen } from "../models/screen.model.js";
import { Show } from "../models/show.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";

// NEW: This fool-proof helper function is unambiguous and works on any server.
const createUTCFromIST = (date, hours, minutes = 0) => {
  // Get date parts (YYYY-MM-DD) from the input date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // Get time parts (HH:MM) and ensure they are two digits
  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');

  // Construct the full ISO string with the IST offset
  const isoString = `${year}-${month}-${day}T${hh}:${mm}:00+05:30`;

  // Create a new Date object from the explicit string, which correctly calculates the UTC value
  return new Date(isoString);
};

const addMovie = asyncHandler(async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    throw new ApiError(400, "All fields are required");
  }

  const movie = await Movie.create({ name, description, image });

  return res
    .status(201)
    .json(new ApiResponse(201, movie, "Movie added successfully"));
});

const addCinema = asyncHandler(async (req, res) => {
  const { name, city, screens } = req.body;

  if (!name || !city) {
    throw new ApiError(400, "Name and city are required");
  }

  const cinema = await Cinema.create({ name, city, screens });

  return res
    .status(201)
    .json(new ApiResponse(201, cinema, "Cinema added successfully"));
});

const addScreen = asyncHandler(async (req, res) => {
  const { screenNumber, totalSeats, shows } = req.body;

  if (!screenNumber || !totalSeats) {
    throw new ApiError(400, "Screen number and total seats are required");
  }

  const screen = await Screen.create({ screenNumber, totalSeats, shows });

  return res
    .status(201)
    .json(new ApiResponse(201, screen, "Screen added successfully"));
});

const addShow = asyncHandler(async (req, res) => {
  const { movieId, showtime } = req.body;

  if (!movieId || !showtime) {
    throw new ApiError(400, "Movie ID and showtime are required");
  }

  const show = await Show.create({ movieId, showtime });

  return res
    .status(201)
    .json(new ApiResponse(201, show, "Show added successfully"));
});

const generateSampleData = asyncHandler(async (req, res) => {
  // Clear existing data
  await Booking.deleteMany({});
  await User.updateMany({}, { $set: { bookings: [] } });
  await Movie.deleteMany({});
  await Show.deleteMany({});
  await Screen.deleteMany({});
  await Cinema.deleteMany({});

  // 1. Create Movies
  const movies = await Movie.create([
    {
      name: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    },
    {
      name: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    },
  ]);

  const [inception, oppenheimer] = movies;

  // 2. Define Cinema Data
  const cinemaData = [
    { name: "PVR Elante", city: "Chandigarh" },
    { name: "Cinepolis Jagat", city: "Chandigarh" },
    { name: "PVR VR Punjab", city: "Mohali" },
    { name: "Cinepolis Bestech", city: "Mohali" },
  ];

  // 3. Get today's, tomorrow's and day after tomorrow's dates in IST
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // 4. Loop through each cinema to create unique screens and shows
  for (const cinemaInfo of cinemaData) {
    // For each cinema, create a unique set of shows for its screens
    const showsForThisCinema = await Show.create([
      // TODAY - Inception Shows (3 shows)
      { movieId: inception._id, showtime: createUTCFromIST(today, 10, 0) }, // 10:00 AM IST
      { movieId: inception._id, showtime: createUTCFromIST(today, 15, 0) }, // 3:00 PM IST
      { movieId: inception._id, showtime: createUTCFromIST(today, 21, 0) }, // 9:00 PM IST
      
      // TODAY - Oppenheimer Shows (3 shows)
      { movieId: oppenheimer._id, showtime: createUTCFromIST(today, 12, 0) }, // 12:00 PM IST
      { movieId: oppenheimer._id, showtime: createUTCFromIST(today, 18, 0) }, // 6:00 PM IST
      { movieId: oppenheimer._id, showtime: createUTCFromIST(today, 23, 0) }, // 11:00 PM IST
      
      // TOMORROW - Inception Shows (3 shows)
      { movieId: inception._id, showtime: createUTCFromIST(tomorrow, 10, 0) }, // 10:00 AM IST Tomorrow
      { movieId: inception._id, showtime: createUTCFromIST(tomorrow, 15, 0) }, // 3:00 PM IST Tomorrow
      { movieId: inception._id, showtime: createUTCFromIST(tomorrow, 21, 0) }, // 9:00 PM IST Tomorrow
      
      // TOMORROW - Oppenheimer Shows (3 shows)
      { movieId: oppenheimer._id, showtime: createUTCFromIST(tomorrow, 12, 0) }, // 12:00 PM IST Tomorrow
      { movieId: oppenheimer._id, showtime: createUTCFromIST(tomorrow, 18, 0) }, // 6:00 PM IST Tomorrow
      { movieId: oppenheimer._id, showtime: createUTCFromIST(tomorrow, 23, 0) }, // 11:00 PM IST Tomorrow
      
      // DAY AFTER TOMORROW - Inception Shows (3 shows)
      { movieId: inception._id, showtime: createUTCFromIST(dayAfterTomorrow, 10, 0) }, // 10:00 AM IST Day After Tomorrow
      { movieId: inception._id, showtime: createUTCFromIST(dayAfterTomorrow, 15, 0) }, // 3:00 PM IST Day After Tomorrow
      { movieId: inception._id, showtime: createUTCFromIST(dayAfterTomorrow, 21, 0) }, // 9:00 PM IST Day After Tomorrow
      
      // DAY AFTER TOMORROW - Oppenheimer Shows (3 shows)
      { movieId: oppenheimer._id, showtime: createUTCFromIST(dayAfterTomorrow, 12, 0) }, // 12:00 PM IST Day After Tomorrow
      { movieId: oppenheimer._id, showtime: createUTCFromIST(dayAfterTomorrow, 18, 0) }, // 6:00 PM IST Day After Tomorrow
      { movieId: oppenheimer._id, showtime: createUTCFromIST(dayAfterTomorrow, 23, 0) }, // 11:00 PM IST Day After Tomorrow
    ]);

    // Create the screens and assign the shows across 4 screens to accommodate all shows
    const screenDocs = await Screen.create([
      // Screen 1 - Mixed shows across all 3 days (4-5 shows)
      { screenNumber: 1, totalSeats: 100, shows: [
        showsForThisCinema[0]._id, // Inception 10 AM Today
        showsForThisCinema[6]._id, // Inception 10 AM Tomorrow
        showsForThisCinema[12]._id, // Inception 10 AM Day After Tomorrow
        showsForThisCinema[3]._id, // Oppenheimer 12 PM Today
        showsForThisCinema[9]._id  // Oppenheimer 12 PM Tomorrow
      ] },
      
      // Screen 2 - Mixed shows across all 3 days (4-5 shows)
      { screenNumber: 2, totalSeats: 100, shows: [
        showsForThisCinema[1]._id, // Inception 3 PM Today
        showsForThisCinema[7]._id, // Inception 3 PM Tomorrow
        showsForThisCinema[13]._id, // Inception 3 PM Day After Tomorrow
        showsForThisCinema[4]._id, // Oppenheimer 6 PM Today
        showsForThisCinema[10]._id // Oppenheimer 6 PM Tomorrow
      ] },
      
      // Screen 3 - Mixed shows across all 3 days (4-5 shows)
      { screenNumber: 3, totalSeats: 100, shows: [
        showsForThisCinema[2]._id, // Inception 9 PM Today
        showsForThisCinema[8]._id, // Inception 9 PM Tomorrow
        showsForThisCinema[14]._id, // Inception 9 PM Day After Tomorrow
        showsForThisCinema[5]._id, // Oppenheimer 11 PM Today
        showsForThisCinema[11]._id // Oppenheimer 11 PM Tomorrow
      ] },
      
      // Screen 4 - Remaining shows (4 shows)
      { screenNumber: 4, totalSeats: 100, shows: [
        showsForThisCinema[15]._id, // Oppenheimer 12 PM Day After Tomorrow
        showsForThisCinema[16]._id, // Oppenheimer 6 PM Day After Tomorrow
        showsForThisCinema[17]._id  // Oppenheimer 11 PM Day After Tomorrow
      ] },
    ]);

    // Create the cinema and link its screens
    await Cinema.create({
      ...cinemaInfo,
      screens: screenDocs.map(s => s._id),
    });
  }

  return res.status(201).json(new ApiResponse(201, {}, "Sample data generated successfully"));
});

export { addMovie, addCinema, addScreen, addShow, generateSampleData };
