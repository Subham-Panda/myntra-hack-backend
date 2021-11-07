const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/all', postController.getPosts);
router.get('/user', postController.getUserPosts);


module.exports = router;
