import express from "express";
import tourController from "../controllers/tour.controller.js";

const tourRouter = express.Router();

tourRouter.param("id", tourController.checkID);

tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
