const express = require('express');
const router = express.Router();

// Import controllers
const {
    addReactionToPostController,
    removeReactionFromPostController
} = require('../controllers/react.controllers');

// Import validation
const { createReactValidation, updateReactValidation } = require('../validation/react-validator');

// Import validationResult from express-validator
const { validationResult } = require('express-validator');

// Function to handle validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Define routes
router.post('/react/add', createReactValidation, validate, addReactionToPostController); // Add reaction to post
router.delete('/react/remove', updateReactValidation, validate, removeReactionFromPostController); // Remove reaction from post

module.exports = router;
