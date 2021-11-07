const express = require('express');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

//Start express app
const app = express();

//GLOBAL MIDDLEWARES

app.use(cors());
app.options('*',cors());

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //the option given as object limits data in the req body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//ROUTES
app.use('/users', userRouter);
app.use('/product',productRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//On passing argument into next function in express, it automatically goes to the error handler function considering the argument of th next function as the error

app.use(globalErrorHandler);
//error handler function has 4 arguments as input

//Exporting the express app
module.exports = app;
