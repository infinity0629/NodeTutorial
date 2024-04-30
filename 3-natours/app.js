import express from 'express';
import morgan from 'morgan';
import { router as tourRouter } from './routers/tour.router.js';
import { router as userRouter } from './routers/user.router.js';

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export { app };
