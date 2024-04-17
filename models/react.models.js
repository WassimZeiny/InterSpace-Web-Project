const db = require('../database/index');

class MessageModel {
    static async sendMessage(msgContent, senderID, receiverID) {
        const query = `
            INSERT INTO Messages (msg_content, sender_id, receiver_id)
            VALUES (?, ?, ?)
        `;
        const values = [msgContent, senderID, receiverID];

        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error sending message: ' + error.message);
        }
    }

    static async receiveMessage(receiverID) {
        const query = 'SELECT * FROM Messages WHERE receiver_id = ?';
        try {
            const [messages] = await db.query(query, [receiverID]);
            return messages;
        } catch (error) {
            throw new Error('Error receiving messages: ' + error.message);
        }
    }
}

module.exports = MessageModel;
