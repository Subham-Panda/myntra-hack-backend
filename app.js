const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

//Start express app
const app = express();

//GLOBAL MIDDLEWARES

app.use(cors());

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); //the option given as object limits data in the req body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

//ROUTES
app.use('/users', userRouter);
app.use('/product',productRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found'
    });
});

//Exporting the express app
module.exports = app;
