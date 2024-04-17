/**
 * Validators for user-related operations.
 */

const { check } = require('express-validator');
const { query } = require('../database/db');

/**
 * Check if the provided username is unique in the database.
 * @param {string} value - The username to be checked for uniqueness.
 * @returns {Promise<void>} - Promise rejection if the username is not unique.
 */
const isUserNameUnique = async (value) => {
    const sql = 'SELECT COUNT(*) AS count FROM User WHERE userName = ?';
    const result = await query(sql, [value]);
    if (result && result[0] && result[0].count > 0) {
        return Promise.reject('Username is already in use');
    }
};

/**
 * Validation rules for creating a new user.
 */
const createUserValidation = [
    check('userName').notEmpty().withMessage('Username is required'),
    check('userName').custom(isUserNameUnique).withMessage('Username should be unique'),
    check('name').notEmpty().withMessage('Name is required'),
    check('userEmail').notEmpty().withMessage('Email is required'),
    check('userEmail').isEmail().withMessage('Invalid Email format'),
    check('userPassword').notEmpty().withMessage('Password is required'),
    check('userPassword').isStrongPassword().withMessage('Weak password'),
    check('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
];

/**
 * Validation rules for updating a user's information.
 */
const updateUserValidation = [
    check('userName').notEmpty().withMessage('Username is required'),
    check('userName').custom(isUserNameUnique).withMessage('Username should be unique'),
    check('name').notEmpty().withMessage('Name is required'),
    check('userEmail').notEmpty().withMessage('Email is required'),
    check('userEmail').isEmail().withMessage('Invalid Email format'),
    check('userPassword').notEmpty().withMessage('Password is required'),
    check('userPassword').isStrongPassword().withMessage('Weak password'),
    check('userPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
];

module.exports = {
    createUserValidation,
    updateUserValidation
};
