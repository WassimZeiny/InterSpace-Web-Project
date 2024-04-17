const { addFriend, removeFriend } = require('../services/friends.services');


/**
 * Controller function to add a friend for a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const addFriendController = async (req, res) => {
    try {
        const { userID, friendID } = req.body;
        await addFriend(userID, friendID);
        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to remove a friend for a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const removeFriendController = async (req, res) => {
    try {
        const { userID, friendID } = req.body;
        await removeFriend(userID, friendID);
        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addFriendController,
    removeFriendController
};
