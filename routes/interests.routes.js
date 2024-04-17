const express = require('express');
const router = express.Router();

// Import controller
const { createInterestIfNotExistsController } = require('../controllers/interests.controllers');

// Import validation
const { validationResult } = require('express-validator');
const { interestValidation } = require('../validation/interests-validator');

// Route to create an interest if it doesn't exist
router.post('/interest', interestValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Call the controller function to create the interest if validation succeeds
        await createInterestIfNotExistsController(req, res);
    } catch (error) {
        // Handle internal server error
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
