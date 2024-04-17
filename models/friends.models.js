const db = require('../database/index');

class FriendModel {
    static async addFriend(userID, friendID) {
        const query = 'INSERT INTO Friends (User_userID, friendID) VALUES (?, ?)';
        try {
            const [result] = await db.query(query, [userID, friendID]);
            return result;
        } catch (error) {
            throw new Error('Error adding friend: ' + error.message);
        }
    }

    static async removeFriend(userID, friendID) {
        const query = 'DELETE FROM Friends WHERE (User_userID = ? AND friendID = ?) OR (User_userID = ? AND friendID = ?)';
        try {
            const [result] = await db.query(query, [userID, friendID, friendID, userID]);
            return result;
        } catch (error) {
            throw new Error('Error removing friend: ' + error.message);
        }
    }
}

module.exports = FriendModel;
