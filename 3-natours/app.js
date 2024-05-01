import express from "express";
import morgan from "morgan";
import config from "./utils.js";
import tourRouter from "./routers/tour.router.js";
import userRouter from "./routers/user.router.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${config.__dirname}/public`));

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
