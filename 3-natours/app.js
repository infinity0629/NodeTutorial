import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import url from 'url';
import { dirname } from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  });
};

const updateTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here...>' },
  });
};

const deleteTour = (req, res) => {
  const tour = tours.find((element) => String(element.id) === req.params.id);

  if (!tour) {
    res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    return;
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    // requestedAt: req.requestTime,
    results: users.length,
    data: { users },
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 3000;
app.listen(port, () => console.log(`App running on port ${port}...`));
