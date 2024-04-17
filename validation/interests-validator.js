/**
 * Validators for interest-related operations.
 */

const { check } = require('express-validator');

/**
 * Validation rules for creating an interest.
 */
const interestValidation = [
    check('interestName').notEmpty().withMessage('Interest name is required'),
];

module.exports = {
    interestValidation
};
