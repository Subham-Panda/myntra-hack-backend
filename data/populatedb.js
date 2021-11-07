const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productData = require('./productData.json');
dotenv.config();

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connections successful'));

const Product = require('../models/productModel');

const populateDB = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(productData);
        console.log('DB populated');
    } catch (err) {
        console.error(err);
    }
};

populateDB();