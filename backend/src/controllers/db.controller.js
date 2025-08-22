import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Movie } from "../models/movie.model.js";
import { Cinema } from "../models/cinema.model.js";
import { Screen } from "../models/screen.model.js";
import { Show } from "../models/show.model.js";
import mongoose from "mongoose";

const getMovies = asyncHandler(async (req, res) => {
  const shows = await Show.find({}).populate("movieId");
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

  return res
    .status(200)
    .json(new ApiResponse(200, cleanMovies, "Movies fetched successfully"));
});

const getScreens = asyncHandler(async (req, res) => {
  const { city, movieId } = req.body;

  if (!city || !movieId) {
    throw new ApiError(400, "City and movie are required");
  }

  const movie = await Movie.findOne({ _id: movieId });
  if (!movie) {
    throw new ApiError(404, "Movie not found");
  }

  const shows = await Show.find({ movieId: movie._id });
  const showIds = shows.map((s) => s._id);

  const screens = await Screen.find({ shows: { $in: showIds } }).populate(
    "shows"
  );
  const screenIds = screens.map((s) => s._id);

  const cinemas = await Cinema.find({
    city,
    screens: { $in: screenIds },
  }).populate({
    path: "screens",
    populate: {
      path: "shows",
      model: "Show",
    },
  });

  const filteredCinemas = cinemas
    .map((cinema) => {
      const filteredScreens = cinema.screens
        .map((screen) => {
          const filteredShows = screen.shows.filter((show) =>
            showIds.some((id) => id.equals(show._id))
          );
          if (filteredShows.length > 0) {
            // Clean shows data and sort by time
            const cleanShows = filteredShows
              .map((show) => {
                const showObj = show.toObject();
                delete showObj.createdAt;
                delete showObj.updatedAt;
                delete showObj.__v;
                return showObj;
              })
              .sort((a, b) => {
                // Sort shows by showtime (Date object)
                if (a.showtime && b.showtime) {
                  return new Date(a.showtime) - new Date(b.showtime);
                }
                return 0;
              });

            // Clean screen data
            const screenObj = screen.toObject();
            delete screenObj.createdAt;
            delete screenObj.updatedAt;
            delete screenObj.__v;

            return { ...screenObj, shows: cleanShows };
          }
          return null;
        })
        .filter((screen) => screen !== null)
        .sort((a, b) => {
          // Sort screens by screen number in ascending order
          return a.screenNumber - b.screenNumber;
        });

      // Clean cinema data
      const cinemaObj = cinema.toObject();
      delete cinemaObj.createdAt;
      delete cinemaObj.updatedAt;
      delete cinemaObj.__v;

      return { ...cinemaObj, screens: filteredScreens };
    })
    .sort((a, b) => {
      // Sort cinemas alphabetically by name
      return a.name.localeCompare(b.name);
    });

  return res
    .status(200)
    .json(
      new ApiResponse(200, filteredCinemas, "Screens fetched successfully")
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

  return res
    .status(200)
    .json(new ApiResponse(200, show, "Show fetched successfully"));
});

export { getMovies, getScreens, getShow };
