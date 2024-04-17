const {
    addReactionToPost,
    removeReactionFromPost
} = require('../services/react.services');

/**
 * Controller function to add a reaction to a post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const addReactionToPostController = async (req, res) => {
    try {
        const { postID, userID, reactionType } = req.body;
        await addReactionToPost(postID, userID, reactionType);
        res.status(200).json({ message: "Reaction added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to remove a reaction from a post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const removeReactionFromPostController = async (req, res) => {
    try {
        const { postID, userID } = req.body;
        await removeReactionFromPost(postID, userID);
        res.status(200).json({ message: "Reaction removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addReactionToPostController,
    removeReactionFromPostController
};
