import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Cinema } from "../models/cinema.model.js";
import { Screen } from "../models/screen.model.js";
import { Show } from "../models/show.model.js";

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

  // 3. Loop through each cinema to create unique screens and shows
  for (const cinemaInfo of cinemaData) {
    // For each cinema, create a unique set of shows for its screens
    const showsForThisCinema = await Show.create([
      // Shows for Screen 1 - August 23rd IST (stored as UTC)
      { movieId: inception._id, showtime: "2025-08-23T04:30:00.000Z" }, // 10:00 AM IST
      { movieId: oppenheimer._id, showtime: "2025-08-23T06:30:00.000Z" }, // 12:00 PM IST
      // Shows for Screen 2 - August 23rd IST (stored as UTC)
      { movieId: inception._id, showtime: "2025-08-23T09:30:00.000Z" }, // 3:00 PM IST
      { movieId: oppenheimer._id, showtime: "2025-08-23T12:30:00.000Z" }, // 6:00 PM IST
      // Shows for Screen 3 - August 23rd IST (stored as UTC)
      { movieId: inception._id, showtime: "2025-08-23T15:30:00.000Z" }, // 9:00 PM IST
      { movieId: oppenheimer._id, showtime: "2025-08-23T17:30:00.000Z" }, // 11:00 PM IST
      // Shows for Screen 4 - August 24th IST (stored as UTC)
      { movieId: inception._id, showtime: "2025-08-24T04:30:00.000Z" }, // 10:00 AM IST Aug 24
      { movieId: oppenheimer._id, showtime: "2025-08-24T12:30:00.000Z" }, // 6:00 PM IST Aug 24
    ]);

    // Create the screens and assign the unique shows we just made
    const screenDocs = await Screen.create([
      { screenNumber: 1, totalSeats: 100, shows: [showsForThisCinema[0]._id, showsForThisCinema[1]._id] },
      { screenNumber: 2, totalSeats: 100, shows: [showsForThisCinema[2]._id, showsForThisCinema[3]._id] },
      { screenNumber: 3, totalSeats: 100, shows: [showsForThisCinema[4]._id, showsForThisCinema[5]._id] },
      { screenNumber: 4, totalSeats: 100, shows: [showsForThisCinema[6]._id, showsForThisCinema[7]._id] },
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
