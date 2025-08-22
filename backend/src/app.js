import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
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

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());
// to help server access the cookies on user's browse

import healthRouter from "./routes/health.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import dbRouter from "./routes/db.routes.js";

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/db", dbRouter);

app.use(errorHandler);

export { app };
