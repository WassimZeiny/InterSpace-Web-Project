const db = require('../database/db');

/**
 * Sends a message from one user to another.
 * @param {number} senderID The ID of the user sending the message.
 * @param {number} receiverID The ID of the user receiving the message.
 * @param {string} msgContent The content of the message.
 * @param {function} query The database query function.
 * @returns {boolean} Indicates whether the message was sent successfully.
 * @throws {Error} Throws an error if the database operation fails.
 */
const sendMessage = async (senderID, receiverID, msgContent, query) => {
    try {
        let sql = `
        INSERT INTO Msg (User_userID, Friends_friendID, msgContent)
        VALUES (?, ?, ?)`;

        const result = await db.query(sql, [senderID, receiverID, msgContent]);
        return result; // Indicate that the message was sent successfully
    } catch (error) {
        throw new Error(`Failed to send message: ${error.message}`);
    }
};

/**
 * Retrieves messages received by a user.
 * @param {number} receiverID The ID of the user receiving the messages.
 * @param {function} query The database query function.
 * @returns {Promise<Array>} A promise that resolves with an array of messages.
 * @throws {Error} Throws an error if the database operation fails.
 */
const receiveMessage = async (receiverID, query) => {
    try {
        let sql = `
        SELECT *
        FROM Msg
        WHERE Friends_friendID = ?`;

        const messages = await db.query(sql, receiverID);
        return messages;
    } catch (error) {
        throw new Error(`Failed to receive messages: ${error.message}`);
    }
};

module.exports = {
    sendMessage,
    receiveMessage
};
