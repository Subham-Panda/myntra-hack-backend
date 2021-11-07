const catchAsync = require('../utils/catchAsync');

const Post = require('../models/postModel');

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Posts.find();
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts
    }
  });
});

exports.getUserPosts = catchAsync(async (req, res, next) => {
    const userId = req.user.id
    const posts = await Posts.find({user: userId});
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts
      }
    });
  });