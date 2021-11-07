const express = require('express');
const userController = require('../controllers/userController');
// const authController = require('../controllers/authController');

const router = express.Router();

// router.post('/register', authController.register);

// router.use(authController.protect); //Since middleware run in sequence, every route below this is protected
router.get('/me',userController.getUser);
router.post('/add/bag',userController.addToBag);
router.post('/remove/bag',userController.deleteBagItem);
router.post('/update/bag',userController.updateBagItem);
router.post('/add/wishlist',userController.addToWishlist);
router.post('/remove/wishlist',userController.deleteWishlistItem);
router.post('/order',userController.placeOrder);

module.exports = router;
