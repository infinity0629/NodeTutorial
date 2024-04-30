import express from "express";
import morgan from "morgan";
import tourRouter from "./routers/tour.router.js";
import userRouter from "./routers/user.router.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

export default app;
