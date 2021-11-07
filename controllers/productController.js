const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const Product = require('../models/productModel');

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products
    }
  });
});