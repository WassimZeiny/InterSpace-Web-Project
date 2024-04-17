const express = require('express');
const router = express.Router();

// Import controllers
const { addFriendController, removeFriendController } = require('../controllers/friends.controllers');

// Import validation
const { validationResult } = require('express-validator');
const { friendValidation } = require('../validation/friends-validator');

// Route to add a friend
router.post('/friend/add', friendValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the addFriendController
    try {
        await addFriendController(req, res);
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route to remove a friend
router.delete('/friend/remove', friendValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the removeFriendController
    try {
        await removeFriendController(req, res);
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
