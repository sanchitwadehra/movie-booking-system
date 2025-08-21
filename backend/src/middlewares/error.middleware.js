// backend/src/middlewares/error.middleware.js

import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (!(err instanceof ApiError) && process.env.NODE_ENV === 'production') {
        console.error("----- UNHANDLED ERROR -----");
        console.error(err.stack);
        console.error("---------------------------");

        statusCode = 500;
        message = "Something went wrong on our end. Please try again later.";
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

export { errorHandler };



// Another difference is that in case of an unexpected error in the server the user wont get that specifc error in the frontend as it is in the production environment and it is not secure for the frontend user to receive the details of an unexpected error and we detect that it is an unexpected in the server by cheking whether the error is an instance of ApiError and if it is not then we send a generic error message to the frontend and we log the error in the server logs.