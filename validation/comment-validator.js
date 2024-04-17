/**
 * Validators for comment-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for creating comments.
 * Ensures that comment content, user ID, and post ID are provided.
 */
const createCommentValidation = [
    check('commentContent').notEmpty().withMessage('Comment content is required'),
    check('User_userID').notEmpty().withMessage('User ID is required'),
    check('Posts_postID').notEmpty().withMessage('Post ID is required'),
];

module.exports = {
    createCommentValidation
};
