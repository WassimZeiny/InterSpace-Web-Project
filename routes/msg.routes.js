const express = require('express');
const router = express.Router();

// Import controllers
const {
    sendMessageController,
    receiveMessageController
} = require('../controllers/msg.controllers');

// Import validation
const { validationResult } = require('express-validator');
const { messageValidation } = require('../validation/msg-validator');

// Route to send a message
router.post('/message/send', messageValidation, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, call the controller function to send the message
    sendMessageController(req, res);
});

// Route to receive messages for a specific receiver ID
router.get('/message/receive/:receiverID', receiveMessageController);

module.exports = router;
