const express = require('express');
const router = express.Router();

// Import controllers
const { addCommentToPostController, removeCommentFromPostController } = require('../controllers/comment.controllers');

// Import validation
const { validationResult } = require('express-validator');
const { createCommentValidation } = require('../validation/comment-validator');

// Route to add a comment to a post
router.post('/comment/add', createCommentValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Call the controller function to add comment
        await addCommentToPostController(req, res);
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to remove a comment from a post
router.delete('/comment/remove/:commentID', removeCommentFromPostController);

module.exports = router;
