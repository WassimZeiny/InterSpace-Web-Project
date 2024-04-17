const {sendMessage, receiveMessage} = require('../services/msg.services');

/**
 * Controller function to send a message to a specified receiver.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const sendMessageController = async (req, res) => {
    try {
        const { senderID, receiverID, msgContent } = req.body;
        await sendMessage(senderID, receiverID, msgContent);
        res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to receive messages for a specified receiver.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with received messages or an error message.
 */
const receiveMessageController = async (req, res) => {
    try {
        const { receiverID } = req.params;
        const messages = await receiveMessage(receiverID);
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    sendMessageController,
    receiveMessageController
};
