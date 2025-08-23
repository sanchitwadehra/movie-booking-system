import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Show } from "../models/show.model.js";
import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Screen } from "../models/screen.model.js";
import { Cinema } from "../models/cinema.model.js";
import { Movie } from "../models/movie.model.js";

const payNow = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { showId, seats } = req.body;

    if (!showId) {
      throw new ApiError(400, "Show ID is required");
    }

    if (!seats || !Array.isArray(seats) || seats.length === 0) {
      throw new ApiError(400, "Seats are required");
    }

    if (seats.length > 6) {
      throw new ApiError(400, "You can only book up to 6 seats at a time");
    }

    // Ensure seats are stored as individual strings
    const seatStrings = seats.map((seat) => String(seat).trim());

    const show = await Show.findById(showId).session(session);

    if (!show) {
      throw new ApiError(400, "Show not found");
    }

    const alreadyBooked = seatStrings.some((seat) =>
      show.seatsBooked.includes(seat)
    );
    if (alreadyBooked) {
      throw new ApiError(400, "One or more seats are already booked");
    }

    const screen = await Screen.findOne({ shows: showId }).session(session);

    if (!screen) {
      throw new ApiError(400, "Screen for the show not found");
    }

    if (show.seatsBooked.length + seatStrings.length > screen.totalSeats) {
      throw new ApiError(400, "Seats are not available");
    }

    const updatedShow = await Show.findByIdAndUpdate(
      showId,
      { $push: { seatsBooked: { $each: seatStrings } } },
      { session, new: true }
    );

    if (!updatedShow) {
      throw new ApiError(400, "Failed to update show");
    }

    const booking = await Booking.create(
      [
        {
          show: showId,
          seatsBooked: seatStrings,
          user: req.user._id,
        },
      ],
      { session }
    );

    if (!booking) {
      throw new ApiError(400, "Booking failed");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: { bookings: booking[0]._id },
      },
      { session, new: true }
    );

    if (!updatedUser) {
      throw new ApiError(400, "Failed to update user");
    }

    await session.commitTransaction();
    return res
      .status(200)
      .json(
        new ApiResponse(200, { show: updatedShow }, "Seats booked successfully")
      );
  } catch (error) {
    await session.abortTransaction();
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "Some Error in Booking Seats");
  } finally {
    session.endSession();
  }
});

const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .select("-createdAt -updatedAt -__v")
    .populate({
      path: "show",
      select: "-createdAt -updatedAt -__v",
      populate: {
        path: "movieId",
        model: "Movie",
        select: "name",
      },
    });

  if (bookings.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { bookings }, "No bookings found", true));
  }

  // Enhance bookings with cinema and screen information
  const enhancedBookings = await Promise.all(
    bookings.map(async (booking) => {
      // Find the screen that contains this show
      const screen = await Screen.findOne({ shows: booking.show._id }).select(
        "screenNumber"
      );

      // Find the cinema that contains this screen
      const cinema = await Cinema.findOne({ screens: screen?._id }).select(
        "name city"
      );

      return {
        ...booking.toObject(),
        show: {
          ...booking.show.toObject(),
          screenNumber: screen?.screenNumber || null,
          cinemaName: cinema?.name || null,
          city: cinema?.city || null,
        },
      };
    })
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { bookings: enhancedBookings },
        "Bookings fetched successfully",
        true
      )
    );
});

// Utility function to fix any existing shows with comma-separated seatsBooked
// const fixShowSeatsFormat = asyncHandler(async (req, res) => {
//   try {
//     const shows = await Show.find({});
//     let fixedCount = 0;

//     for (const show of shows) {
//       let needsUpdate = false;
//       const newSeatsBooked = [];

//       for (const seat of show.seatsBooked) {
//         if (seat.includes(',')) {
//           // This seat entry contains comma-separated values
//           const individualSeats = seat.split(',').map(s => s.trim());
//           newSeatsBooked.push(...individualSeats);
//           needsUpdate = true;
//         } else {
//           newSeatsBooked.push(seat);
//         }
//       }

//       if (needsUpdate) {
//         await Show.findByIdAndUpdate(show._id, { seatsBooked: newSeatsBooked });
//         fixedCount++;
//       }
//     }

//     return res
//       .status(200)
//       .json(
//         new ApiResponse(200, { fixedCount }, `Fixed ${fixedCount} shows with comma-separated seats`)
//       );
//   } catch (error) {
//     throw new ApiError(500, "Error fixing show seats format");
//   }
// });

export { payNow, getBookings };
