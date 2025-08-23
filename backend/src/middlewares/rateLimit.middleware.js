import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

// 1. Limiter for sensitive login actions (already created)
export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 15, // Limit each IP to 15 requests
	handler: (req, res, next, options) => {
		throw new ApiError(options.statusCode, "Too many OTP requests from this IP, please try again after 15 minutes");
	},
	standardHeaders: true,
	legacyHeaders: false,
});

// 2. NEW: A more lenient limiter for logged-in users performing resource-heavy actions
export const loggedInLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 25, // Allow more requests for authenticated users
    handler: (req, res, next, options) => {
		throw new ApiError(options.statusCode, "Too many requests, please try again later.");
	},
    standardHeaders: true,
	legacyHeaders: false,
});

// 3. NEW: A general limiter for other public endpoints
export const publicApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // A general limit for non-sensitive public APIs
    handler: (req, res, next, options) => {
		throw new ApiError(options.statusCode, "Too many requests, please try again later.");
	},
    standardHeaders: true,
	legacyHeaders: false,
});






// Of course, Sanchit. Let's break down what those two lines in your Canvas document mean. They control how the rate limiter communicates its status back to the client via HTTP headers.

// In simple terms:

// * `standardHeaders: true`: This enables the modern, standardized rate-limiting headers. When a client makes a request, the response will include headers like:
//     * `RateLimit-Limit`: The total number of requests allowed (e.g., 20).
//     * `RateLimit-Remaining`: How many requests are left in the current time window.
//     * `RateLimit-Reset`: When the window resets (in seconds).

// * `legacyHeaders: false`: This **disables** the older, non-standard headers that did the same thing but started with `X-` (e.g., `X-RateLimit-Limit`).

// **Why is this the best practice?**

// You've configured it perfectly. By enabling the standard headers and disabling the legacy ones, you are using the current industry best practice. It keeps your API clean, modern, and compatible with new tools that expect the standardized format, while avoiding sending redundant, old-style headers.