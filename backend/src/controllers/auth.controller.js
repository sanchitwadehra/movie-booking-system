import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import validator from "validator";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userID) => {
  try {
    const user = await User.findById(userID);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    //save karte vakt saari cheezein kickin hojayenge mongoose ki vajah se jaise ki password reuired  true vali toh uss sab ko prevent karne ke liye validatebeforesave false karna pad raha hai

    // console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
    // console.log("ACCESS_TOKEN_EXPIRY:", process.env.ACCESS_TOKEN_EXPIRY);
    // console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);
    // console.log("REFRESH_TOKEN_EXPIRY:", process.env.REFRESH_TOKEN_EXPIRY);

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access tokens"
    );
  }
};

const registerUser = async (email, password) => {
  try {
    const user = await User.create({ email, password });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "something went wrong while registering");
    }

    return await loginUser(email, password);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "something went wrong while registering");
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedinuser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    // Cookie options for setting authentication tokens securely
    const options = {
      // Prevents client-side JavaScript from accessing the cookie (helps mitigate XSS attacks)
      httpOnly: true,
      // Ensures the cookie is only sent over HTTPS in production environment
      secure: process.env.NODE_ENV === "production",
      // Sets the cookie's expiration time (in milliseconds), using the refresh token expiry from environment variables
      maxAge: process.env.REFRESH_TOKEN_EXPIRY,
      // Restricts the cookie to same-site requests to help prevent CSRF attacks
      sameSite: "strict",
    };

    if (!loggedinuser) {
      throw new ApiError(500, "something went wrong while logging in");
    }

    if (!accessToken || !refreshToken || !loggedinuser || !options) {
      throw new ApiError(500, "something went wrong while logging in");
    }

    return { accessToken, refreshToken, loggedinuser, options };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, "something went wrong while logging in");
  }
};

const verifyEmailandPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new ApiError(400, "Password is not strong enough");
  }

  const user = await User.findOne({ email }).select("-password -refreshToken");

  let result;

  if (!user) {
    result = await registerUser(email, password);
  } else {
    result = await loginUser(email, password);
  }

  const { accessToken, refreshToken, loggedinuser, options } = result;

  if (!accessToken || !refreshToken || !loggedinuser || !options) {
    throw new ApiError(
      500,
      "Something went wrong when logging in or registering a new user"
    );
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedinuser },
        "User logged in or registered successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const loggedoutUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  if (!loggedoutUser) {
    throw new ApiError(500, "Something went wrong while logging out");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user || incomingRefreshToken !== user.refreshToken) {
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        sameSite: "strict",
      };
      return res
        .status(401)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(401, null, "Invalid or expired refresh token"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: process.env.REFRESH_TOKEN_EXPIRY,
      sameSite: "strict",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access Token Refreshed Successfully"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

export { verifyEmailandPassword, logoutUser, refreshAccessToken };
