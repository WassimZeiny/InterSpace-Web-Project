const db = require('../database/index');

class CommentModel {
    static async addCommentToPost(postID, userID, commentContent) {
        const query = `
            INSERT INTO Comments (Posts_postID, User_userID, commentContent)
            VALUES (?, ?, ?)
        `;
        const values = [postID, userID, commentContent];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error adding comment to post: ' + error.message);
        }
    }

    static async removeCommentFromPost(commentID) {
        const query = 'DELETE FROM Comments WHERE commentID = ?';
        try {
            const [result] = await db.query(query, commentID);
            return result;
        } catch (error) {
            throw new Error('Error removing comment from post: ' + error.message);
        }
    }
}

module.exports = CommentModel;
