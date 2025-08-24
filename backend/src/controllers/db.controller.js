import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Cinema } from "../models/cinema.model.js";
import { Screen } from "../models/screen.model.js";
import { Show } from "../models/show.model.js";
import mongoose from "mongoose";

const getMovies = asyncHandler(async (req, res) => {
  // Get current UTC time to filter out past shows
  const currentTime = new Date();
  
  const shows = await Show.find({
    showtime: { $gt: currentTime } // Only get shows with future showtimes
  }).populate("movieId");
  
  const movies = shows.reduce((acc, show) => {
    if (show.movieId && !acc.some((m) => m._id.equals(show.movieId._id))) {
      acc.push(show.movieId);
    }
    return acc;
  }, []);

  // Remove unwanted fields from movies
  const cleanMovies = movies.map((movie) => {
    const movieObj = movie.toObject();
    delete movieObj.createdAt;
    delete movieObj.updatedAt;
    delete movieObj.__v;
    return movieObj;
  });

  // Sort movies alphabetically by name (A to Z)
  cleanMovies.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  return res
    .status(200)
    .json(new ApiResponse(200, cleanMovies, "Movies fetched successfully"));
});

const getScreens = asyncHandler(async (req, res) => {
  const { city, movieId, date } = req.body;

  if (!city || !movieId || !date) {
    throw new ApiError(400, "City, movie, and date are required");
  }

  // Validate movieId format to avoid unnecessary DB call
  if (!mongoose.Types.ObjectId.isValid(movieId)) {
    throw new ApiError(400, "Invalid movie ID format");
  }

  // Convert the selected date from IST to UTC range
  const istStartOfDay = new Date(`${date}T00:00:00+05:30`);
  const istEndOfDay = new Date(`${date}T23:59:59.999+05:30`);
  const startOfDay = new Date(istStartOfDay.toISOString());
  const endOfDay = new Date(istEndOfDay.toISOString());
  
  // Get current UTC time to filter out past shows
  const currentTime = new Date();

  // Single optimized aggregation pipeline to get all required data
  const result = await Cinema.aggregate([
    // Match cinemas in the specified city
    { $match: { city: city } },
    
    // Lookup screens for these cinemas
    {
      $lookup: {
        from: "screens",
        localField: "screens",
        foreignField: "_id",
        as: "screens"
      }
    },
    
    // Unwind screens to work with individual screens
    { $unwind: "$screens" },
    
    // Lookup shows for each screen
    {
      $lookup: {
        from: "shows",
        localField: "screens.shows",
        foreignField: "_id",
        as: "screens.shows"
      }
    },
    
    // Filter shows by movie, date, and future showtime
    {
      $addFields: {
        "screens.shows": {
          $filter: {
            input: "$screens.shows",
            cond: {
              $and: [
                { $eq: ["$$this.movieId", new mongoose.Types.ObjectId(movieId)] },
                { $gte: ["$$this.showtime", startOfDay] },
                { $lte: ["$$this.showtime", endOfDay] },
                { $gt: ["$$this.showtime", currentTime] } // Only future shows
              ]
            }
          }
        }
      }
    },
    
    // Only keep screens that have matching shows
    { $match: { "screens.shows.0": { $exists: true } } },
    
    // Sort shows within each screen by showtime
    {
      $addFields: {
        "screens.shows": {
          $sortArray: {
            input: "$screens.shows",
            sortBy: { showtime: 1 }
          }
        }
      }
    },
    
    // Clean up show data (remove unwanted fields)
    {
      $addFields: {
        "screens.shows": {
          $map: {
            input: "$screens.shows",
            as: "show",
            in: {
              _id: "$$show._id",
              movieId: "$$show.movieId",
              showtime: "$$show.showtime",
              price: "$$show.price",
              availableSeats: "$$show.availableSeats",
              bookedSeats: "$$show.bookedSeats"
            }
          }
        }
      }
    },
    
    // Clean up screen data
    {
      $addFields: {
        "screens": {
          _id: "$screens._id",
          screenNumber: "$screens.screenNumber",
          totalSeats: "$screens.totalSeats",
          shows: "$screens.shows"
        }
      }
    },
    
    // Group back by cinema to reconstruct the cinema structure
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        city: { $first: "$city" },
        address: { $first: "$address" },
        screens: { $push: "$screens" }
      }
    },
    
    // Sort screens within each cinema by screen number
    {
      $addFields: {
        screens: {
          $sortArray: {
            input: "$screens",
            sortBy: { screenNumber: 1 }
          }
        }
      }
    },
    
    // Sort cinemas by name
    { $sort: { name: 1 } },
    
    // Only return cinemas that have screens with shows
    { $match: { "screens.0": { $exists: true } } }
  ]);

  // Verify movie exists (only if we have results, to avoid unnecessary query)
  if (result.length === 0) {
    const movieExists = await Movie.exists({ _id: movieId });
    if (!movieExists) {
      throw new ApiError(404, "Movie not found");
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, result, "Screens fetched successfully")
    );
});

const getShow = asyncHandler(async (req, res) => {
  const { showId } = req.body;

  const show = await Show.findOne({ _id: showId })
    .populate({
      path: "movieId",
      select: "-__v -createdAt -updatedAt",
    })
    .select("-__v -createdAt -updatedAt");

  if (!show) {
    throw new ApiError(404, "Show not found");
  }

  // Check if the show time has already passed
  const currentTime = new Date();
  if (show.showtime <= currentTime) {
    throw new ApiError(400, "This show has already ended and is no longer available for booking");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, show, "Show fetched successfully"));
});

export { getMovies, getScreens, getShow };
