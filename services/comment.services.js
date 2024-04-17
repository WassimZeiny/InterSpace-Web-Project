const {query} = require('../database/db');
/**
 * Adds a comment to a post in the database.
 * @param {string} postID The ID of the post to which the comment is added.
 * @param {string} userID The ID of the user who is adding the comment.
 * @param {string} commentContent The content of the comment.
 * @param {function} query The database query function.
 * @returns {Object} The added comment.
 * @throws {Error} Throws an error if the database operation fails.
 */
const addCommentToPost = async (postID, userID, commentContent, query) => {
    try {
        let sql = `
        INSERT INTO Comments (Posts_postID, User_userID, commentContent)
        VALUES (?, ?, ?)`;

        const [comment] = await query(sql, [postID, userID, commentContent]);
        return comment;
    } catch (error) {
        throw new Error(`Failed to add comment to post: ${error.message}`);
    }
};

/**
 * Removes a comment from a post in the database.
 * @param {string} commentID The ID of the comment to be removed.
 * @param {function} query The database query function.
 * @returns {boolean} Indicates whether the comment was successfully removed.
 * @throws {Error} Throws an error if the database operation fails.
 */
const removeCommentFromPost = async (commentID, query) => {
    try {
        let sql = `
        DELETE FROM Comments
        WHERE commentID = ?`;

        const result = await query(sql, [commentID]);
        // Check if the delete operation affected any rows
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Failed to remove comment from post: ${error.message}`);
    }
};

module.exports = {
    addCommentToPost,
    removeCommentFromPost
};
