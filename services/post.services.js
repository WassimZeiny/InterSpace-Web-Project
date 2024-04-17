const db = require('../database/db');

/**
 * Loads posts based on the user's friends and interests.
 * @param {number} userID The ID of the user.
 * @param {function} query The database query function.
 * @returns {Promise<Array>} A promise that resolves with an array of posts.
 * @throws {Error} Throws an error if the database operation fails.
 */
const loadPostsByFriendsAndInterests = async (userID, query) => {
    try {
        let sql = `
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
        )`;

        const posts = await query(sql, [userID, userID]);
        return posts;
    } catch (error) {
        throw new Error(`Failed to load posts: ${error.message}`);
    }
};

/**
 * Loads posts based on the user's interests.
 * @param {number} userID The ID of the user.
 * @param {function} query The database query function.
 * @returns {Promise<Array>} A promise that resolves with an array of posts.
 * @throws {Error} Throws an error if the database operation fails.
 */
const loadPostsByInterests = async (userID, query) => {
    try {
        let sql = `
        SELECT *
        FROM Posts
        WHERE Interests_interestID IN (
            SELECT Interests_interestID
            FROM User_Interests
            WHERE User_userID = ?
        )`;

        const posts = await query(sql, userID);
        return posts;
    } catch (error) {
        throw new Error(`Failed to load posts: ${error.message}`);
    }
};

/**
 * Creates a new post.
 * @param {number} userID The ID of the user creating the post.
 * @param {string} postType The type of the post.
 * @param {string} postContent The content of the post.
 * @param {number} interestsID The ID of the interest associated with the post.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createPost = async (userID, postType, postContent, interestsID, query) => {
    try {
        let sql = `
        INSERT INTO Posts (User_userID, postType, postContent, Interests_interestID)
        VALUES (?, ?, ?, ?)`;

        const result = await query(sql, [userID, postType, postContent, interestsID]);
        return result;
    } catch (error) {
        throw new Error(`Failed to create post: ${error.message}`);
    }
};

/**
 * Deletes a post.
 * @param {number} postID The ID of the post to delete.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const deletePost = async (postID, query) => {
    try {
        let sql = `
        DELETE FROM Posts
        WHERE postID = ?`;

        const result = await query(sql, postID);
        return result;
    } catch (error) {
        throw new Error(`Failed to delete post: ${error.message}`);
    }
};

module.exports = {
    loadPostsByFriendsAndInterests,
    loadPostsByInterests,
    createPost,
    deletePost
};
