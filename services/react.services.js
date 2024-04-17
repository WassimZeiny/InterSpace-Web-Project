/**
 * Adds a reaction to a post.
 * @param {number} postID The ID of the post to react to.
 * @param {number} userID The ID of the user who is reacting.
 * @param {string} reactionType The type of reaction (e.g., 'like', 'dislike').
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const addReactionToPost = async (postID, userID, reactionType, query) => {
    try {
        let sql = `
        INSERT INTO Reacts (Posts_postID, User_userID, reactionType)
        VALUES (?, ?, ?)`;

        const react = await query(sql, [postID, userID, reactionType]);
        return react;
    } catch (error) {
        throw new Error(`Failed to add reaction: ${error.message}`);
    }
};

/**
 * Removes a reaction from a post.
 * @param {number} postID The ID of the post from which to remove the reaction.
 * @param {number} userID The ID of the user whose reaction is to be removed.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const removeReactionFromPost = async (postID, userID, query) => {
    try {
        let sql = `
        DELETE FROM Reacts
        WHERE Posts_postID = ? AND User_userID = ?`;

        const remove = await query(sql, [postID, userID]);
        return remove;
    } catch (error) {
        throw new Error(`Failed to remove reaction: ${error.message}`);
    }
};

module.exports = {
    addReactionToPost,
    removeReactionFromPost
};
