const db = require('../database/index');

class InterestModel {
    static async createIfNotExists(interestName) {
        const checkSql = 'SELECT * FROM Interests WHERE interestName = ?';
        const createSql = 'INSERT INTO Interests (interestName) VALUES (?)';

        try {
            // Check if the interest already exists in the database
            const [existingInterest] = await db.query(checkSql, interestName);

            // If the interest does not exist, create it
            if (existingInterest.length === 0) {
                await db.query(createSql, interestName);
            }
        } catch (error) {
            throw new Error(`Failed to create interest: ${error.message}`);
        }
    }
}

module.exports = InterestModel;
