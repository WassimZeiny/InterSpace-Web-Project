/**
 * Validators for post-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for creating a new post.
 */
const createPostValidation = [
    check('postType').notEmpty().withMessage('Post type is required'),
    check('postContent').notEmpty().withMessage('Post content is required'),
    check('User_userID').notEmpty().withMessage('User ID is required'),
    check('Interests_interestID').notEmpty().withMessage('Interest ID is required'),
];

module.exports = {
    createPostValidation
};
