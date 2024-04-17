const {query} = require('../database/db');

/**
 * Adds a friend relationship between two users in the database.
 * @param {string} userID The ID of the user sending the friend request.
 * @param {string} friendID The ID of the user accepting the friend request.
 * @param {function} query The database query function.
 * @returns {boolean} Indicates whether the friend relationship was successfully added.
 * @throws {Error} Throws an error if the database operation fails.
 */
const addFriend = async (userID, friendID, query) => {
    try {
        let sql = `
        INSERT INTO Friends (User_userID, friendID)
        VALUES (?, ?)`;

       const friend = await query(sql, [userID, friendID]);
        return friend; // Indicate success
    } catch (error) {
        throw new Error(`Failed to add friend: ${error.message}`);
    }
};

/**
 * Removes a friend relationship between two users from the database.
 * @param {string} userID The ID of one of the users in the friend relationship.
 * @param {string} friendID The ID of the other user in the friend relationship.
 * @param {function} query The database query function.
 * @returns {boolean} Indicates whether the friend relationship was successfully removed.
 * @throws {Error} Throws an error if the database operation fails.
 */
const removeFriend = async (userID, friendID, query) => {
    try {
        let sql = `
        DELETE FROM Friends
        WHERE (User_userID = ? AND friendID = ?)
        OR (User_userID = ? AND friendID = ?)`;

        const remove = await db.query(sql, [userID, friendID, friendID, userID]);
        return remove; // Indicate success
    } catch (error) {
        throw new Error(`Failed to remove friend: ${error.message}`);
    }
};

module.exports = {
    addFriend,
    removeFriend
};
