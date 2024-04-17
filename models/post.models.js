const db = require('../database/index');

class PostModel {
    static async loadPostsByFriendsAndInterests(userID) {
        const query = `
            SELECT *
            FROM Posts
            WHERE User_userID IN (
                SELECT friendID
                FROM Friends
                WHERE User_userID = ?
            )
            OR Interests_interestID IN (
                SELECT Interests_interestID
                FROM User_Interests
                WHERE User_userID = ?
            )
        `;
        try {
            const [posts] = await db.query(query, [userID, userID]);
            return posts;
        } catch (error) {
            throw new Error('Error loading posts by friends and interests: ' + error.message);
        }
    }

    static async loadPostsByInterests(userID) {
        const query = `
            SELECT *
            FROM Posts
            WHERE Interests_interestID IN (
                SELECT Interests_interestID
                FROM User_Interests
                WHERE User_userID = ?
            )
        `;
        try {
            const [posts] = await db.query(query, userID);
            return posts;
        } catch (error) {
            throw new Error('Error loading posts by interests: ' + error.message);
        }
    }

    static async createPost(userID, postType, postContent, interestsID) {
        const query = `
            INSERT INTO Posts (User_userID, postType, postContent, Interests_interestID)
            VALUES (?, ?, ?, ?)
        `;
        const values = [userID, postType, postContent, interestsID];
        
        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error creating post: ' + error.message);
        }
    }

    static async deletePost(postID) {
        const query = 'DELETE FROM Posts WHERE postID = ?';
        try {
            const [result] = await db.query(query, postID);
            return result;
        } catch (error) {
            throw new Error('Error deleting post: ' + error.message);
        }
    }
}

module.exports = PostModel;
