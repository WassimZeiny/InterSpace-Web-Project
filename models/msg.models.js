const db = require('../database/index');

class MessageModel {
    static async sendMessage(senderID, receiverID, msgContent) {
        const query = `
            INSERT INTO Msg (senderID, receiverID, msgContent)
            VALUES (?, ?, ?)
        `;
        const values = [senderID, receiverID, msgContent];
        
        try {
            const [result] = await db.query(query, values);
            return result;
        } catch (error) {
            throw new Error('Error sending message: ' + error.message);
        }
    }

    static async receiveMessage(receiverID) {
        const query = 'SELECT * FROM Msg WHERE receiverID = ?';
        try {
            const [messages] = await db.query(query, receiverID);
            return messages;
        } catch (error) {
            throw new Error('Error receiving messages: ' + error.message);
        }
    }
}

module.exports = MessageModel;
