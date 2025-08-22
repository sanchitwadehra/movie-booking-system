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
  
    // 2. Create Shows
    const shows = await Show.create([
      // Inception Shows
      { movieId: inception._id, showtime: "2025-08-23T10:00:00.000Z" },
      { movieId: inception._id, showtime: "2025-08-23T13:00:00.000Z" },
      { movieId: inception._id, showtime: "2025-08-23T16:00:00.000Z" },
      { movieId: inception._id, showtime: "2025-08-24T19:00:00.000Z" },
      { movieId: inception._id, showtime: "2025-08-24T22:00:00.000Z" },
      { movieId: inception._id, showtime: "2025-08-24T11:00:00.000Z" },
      // Oppenheimer Shows
      { movieId: oppenheimer._id, showtime: "2025-08-23T09:30:00.000Z" },
      { movieId: oppenheimer._id, showtime: "2025-08-23T12:30:00.000Z" },
      { movieId: oppenheimer._id, showtime: "2025-08-23T15:30:00.000Z" },
      { movieId: oppenheimer._id, showtime: "2025-08-24T18:30:00.000Z" },
      { movieId: oppenheimer._id, showtime: "2025-08-24T21:30:00.000Z" },
      { movieId: oppenheimer._id, showtime: "2025-08-24T10:30:00.000Z" },
    ]);
  
    // 3. Create Screens and Cinemas
    const cinemaData = [
      { name: "PVR Elante", city: "Chandigarh" },
      { name: "Cinepolis Jagat", city: "Chandigarh" },
      { name: "PVR VR Punjab", city: "Mohali" },
      { name: "Cinepolis Bestech", city: "Mohali" },
    ];
  
    for (const cinemaInfo of cinemaData) {
      const screenDocs = await Screen.create([
        { screenNumber: 1, totalSeats: 100, shows: [shows[0]._id, shows[6]._id] },
        { screenNumber: 2, totalSeats: 100, shows: [shows[1]._id, shows[7]._id] },
        { screenNumber: 3, totalSeats: 100, shows: [shows[2]._id, shows[8]._id] },
        { screenNumber: 4, totalSeats: 100, shows: [shows[3]._id, shows[9]._id] },
      ]);
  
      await Cinema.create({
        ...cinemaInfo,
        screens: screenDocs.map(s => s._id),
      });
    }
  
    return res.status(201).json(new ApiResponse(201, {}, "Sample data generated successfully"));
  });

export { addMovie, addCinema, addScreen, addShow, generateSampleData };
