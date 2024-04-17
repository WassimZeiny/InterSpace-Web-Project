/**
 * Validators for message-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for sending a message.
 */
const messageValidation = [
    check('msgContent').notEmpty().withMessage('Message content is required'),
    check('User_userID').notEmpty().withMessage('User ID is required'),
    check('Friends_friendID').notEmpty().withMessage('Friend ID is required'),
];

module.exports = {
    messageValidation
};
