const express = require('express');
const router = express.Router();

// Import controllers
const {
    loadPostsByFriendsAndInterestsController,
    loadPostsByInterestsController,
    createPostController,
    deletePostController
} = require('../controllers/post.controllers');

// Import validation
const { createPostValidation } = require('../validation/post-validator');

// Import validationResult from express-validator
const { validationResult } = require('express-validator');

// Route to load posts by friends and interests
router.get('/posts/friends-and-interests', loadPostsByFriendsAndInterestsController);

// Route to load posts by interests
router.get('/posts/interests', loadPostsByInterestsController);

// Middleware function to validate input before creating a post
router.post('/posts', createPostValidation, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, createPostController);

// Route to delete a post by post ID
router.delete('/posts/:postID', deletePostController);

module.exports = router;
