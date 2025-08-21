import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import healthRouter from "./routes/health.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
      origin: process.env.CORS_ORIGIN, //process.env.CORS_ORIGIN is the origin of the client
      credentials: true,
    })
);
// credentials: true in CORS settings allow the server to accept credentials like cookies, Authorization headers, or TLS (Transport Layer Security) client certificates in cross-origin requests.

app.use(cookieParser());
// to help server access the cookies on user's browser


app.use("/api/v1/", healthRouter);

app.use(errorHandler);

export { app };
