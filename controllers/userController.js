const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');

exports.getUser = catchAsync(async (req, res, next) => {
    // console.log(req.user)
    const user = await User.findById(req.user.id).populate('bag').populate('wishlist').populate('orders').populate('followers').populate('posts');
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
    const { productId } = req.body;
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

exports.toggleFollow = catchAsync(async (req, res, next) => {
    const { userId } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    let flag = 0;
    user.followers.find((item) => {
        if (item === req.user.id) {
            user.followers.splice(user.followers.indexOf(item), 1);
            flag = 1;
        }
    });

    if (flag === 0) {
        user.followers.push(req.user.id);
    }

    flag = 0;
    const followingUser = await User.findById(req.user.id);
    followingUser.following.find((item) => {
        if (item === userId) {
            followingUser.following.splice(followingUser.following.indexOf(item), 1);
        }
    });

    if (flag === 0) {
        followingUser.following.push(userId);
    }



    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});

exports.toggleLike = catchAsync(async (req, res, next) => {
    const { postId } = req.body;
    const userId = req.user.id;
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    let flag = 0;
    post.likes.find((item) => {
        if (item === userId) {
            post.likes.splice(post.likes.indexOf(item), 1);
            flag = 1;
        }
    });

    if (flag === 0) {
        post.likes.push(userId);
    }

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            post
        },
    });
});

exports.addComment = catchAsync(async (req, res, next) => {
    const { postId, comment } = req.body;
    const userId = req.user.id;
    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            status: 'fail',
            message: 'Post not found'
        });
    }

    post.comments.push({
        user: userId,
        comment,
    });

    await post.save();

    res.status(200).json({
        status: 'success',
        data: {
            post
        },
    });
});

exports.placeNewPost = catchAsync(async (req, res, next) => {
    const { caption, imagelink } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found'
        });
    }

    const post = await Post.create({
        caption,
        imagelink,
        user: userId,
    });

    user.posts.push(post._id);

    await user.save();

    res.status(200).json({
        status: 'success',
        data: {
            user,
        },
    });
});