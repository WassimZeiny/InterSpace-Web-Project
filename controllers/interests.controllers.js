const { createInterestIfNotExists } = require('../services/interests.services');


/**
 * Controller function to create an interest if it doesn't already exist.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const createInterestIfNotExistsController = async (req, res) => {
    try {
        const { interestName } = req.body;
        await createInterestIfNotExists(interestName);
        res.status(200).json({ message: "Interest created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createInterestIfNotExistsController
};
