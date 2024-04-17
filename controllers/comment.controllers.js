const { addCommentToPost, removeCommentFromPost } = require('../services/comment.services');


/**
 * Controller function to add a comment to a post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const addCommentToPostController = async (req, res) => {
    try {
        const { postID, userID, commentContent } = req.body;
        await addCommentToPost(postID, userID, commentContent);
        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to remove a comment from a post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const removeCommentFromPostController = async (req, res) => {
    try {
        const { commentID } = req.params;
        await removeCommentFromPost(commentID);
        res.status(200).json({ message: "Comment removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addCommentToPostController,
    removeCommentFromPostController
};
