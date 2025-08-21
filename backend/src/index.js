import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log("Error:", err);
      console.log(new Date().toISOString());
      throw err;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
      console.log(new Date().toISOString());
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
    console.log(new Date().toISOString());
    throw err;
  });
