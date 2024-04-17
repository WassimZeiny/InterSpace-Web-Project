/**
 * Validators for react-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for adding a reaction to a post.
 */
const createReactValidation = [
    check('reactID').notEmpty().withMessage('Reaction ID is required'),
    check('Posts_postID').notEmpty().withMessage('Post ID is required'),
    check('User_userID').notEmpty().withMessage('User ID is required'),
];

/**
 * Validation rules for updating a reaction.
 */
const updateReactValidation = [
    check('reactID').notEmpty().withMessage('Reaction ID is required'),
    check('Posts_postID').notEmpty().withMessage('Post ID is required'),
    check('User_userID').notEmpty().withMessage('User ID is required'),
];

module.exports = {
    createReactValidation,
    updateReactValidation
};
