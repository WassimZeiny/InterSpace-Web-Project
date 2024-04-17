const db = require('../database/db');

/**
 * Creates a new interest in the database if it does not already exist.
 * @param {string} interestName The name of the interest to create.
 * @param {function} query The database query function.
 * @returns {boolean} Indicates whether the interest was created or already existed.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createInterestIfNotExists = async (interestName, query) => {
    try {
        // Check if the interest already exists in the database
        let checkSql = `
        SELECT *
        FROM Interests
        WHERE interestName = ?`;

        const existingInterest = await db.query(checkSql, [interestName]);

        // If the interest does not exist, create it
        if (existingInterest.length === 0) {
            let createSql = `
            INSERT INTO Interests (interestName)
            VALUES (?)`;

            const result = await db.query(createSql, [interestName]);
            return result; // Indicate that the interest was created
        }

        // Indicate that the interest already exists
        return existingInterest;
    } catch (error) {
        throw new Error(`Failed to create interest: ${error.message}`);
    }
};

module.exports = {
    createInterestIfNotExists
};
