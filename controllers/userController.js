const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

exports.getUser = catchAsync(async (req, res, next) => {
    // console.log(req.user)
    const user = await User.findById(req.user.id).populate('bag').populate('wishlist').populate('orders');
    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.addToBag = catchAsync(async (req, res, next) => {
    const { productId, selected_size, quantity } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.bag.push({
        product: productId,
        selected_size,
        quantity,
    });

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.addToWishlist = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.bag.push(productId);

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.updateBagItem = catchAsync(async (req, res, next) => {
    const { productId, selected_size, quantity } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.bag.forEach((item, index) => {
        if (item.product === productId && item.selected_size === selected_size) {
            user.bag[index].selected_size = selected_size;
            user.bag[index].quantity = quantity;
        }
    });

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.deleteBagItem = catchAsync(async (req, res, next) => {
    const { productId, selected_size } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.bag.forEach((item, index) => {
        if (item.product === productId && item.selected_size === selected_size) {
            user.bag.splice(index, 1);
        }
    });

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});


exports.deleteWishlistItem = catchAsync(async (req, res, next) => {
    const { productId} = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.wishlist.forEach((item, index) => {
        if (item === productId) {
            user.wishlist.splice(index, 1);
        }
    });

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.placeOrder = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    user.bag.forEach(async (item) => {
        user.orders.push(item);
    });

    user.bag = [];

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});