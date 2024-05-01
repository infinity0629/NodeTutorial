import fs from "fs";
import config from "../utils.js";

const tours = JSON.parse(
  fs.readFileSync(`${config.currentDir}/dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  if (!tour) {
    res.status(404).json({ status: "fail", message: "Invalid ID" });
    return;
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(404).json({ status: "fail", message: "Missing name or price" });
    return;
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  res.status(200).json({
    status: "success",
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${config.currentDir}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: "success", data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  res.status(200).json({
    status: "success",
    data: { tour: "<Updated tour here...>" },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

export default {
  checkID,
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
