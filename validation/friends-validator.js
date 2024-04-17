    /**
 * Validators for friend-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for friend management operations such as adding or removing friends.
 * Ensures that user IDs and friend IDs are provided.
 */
const friendValidation = [
    check('User_userID').notEmpty().withMessage('User ID is required'),
    check('friendID').notEmpty().withMessage('Friend ID is required'),
];

module.exports = {
    friendValidation
};
