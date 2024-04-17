const {
    signup,
    updateBio,
    addInterestToUser,
    removeInterestFromUser,
    createUser,
    validateUser,
    getUserByUsername,
    getUserByName,
    editUserName
} = require('../services/user.services');

const signupController = async (req, res) => {
    try{
        const {username, email, pass} = req.body;
        await signup(username, email, pass);
        res.status(200).json({message: "Signup successful"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

/**
 * Controller function to update the bio of a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const updateBioController = async (req, res) => {
    try {
        const { userID, bio } = req.body;
        await updateBio(userID, bio);
        res.status(200).json({ message: "Bio updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to add an interest to a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const addInterestToUserController = async (req, res) => {
    try {
        const { userID, interestID } = req.body;
        await addInterestToUser(userID, interestID);
        res.status(200).json({ message: "Interest added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to remove an interest from a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const removeInterestFromUserController = async (req, res) => {
    try {
        const { userID, interestID } = req.body;
        await removeInterestFromUser(userID, interestID);
        res.status(200).json({ message: "Interest removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to create a new user.
 */
const createUserController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await createUser(username, email, password);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to validate a user's credentials.
 */
const validateUserController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isValid = await validateUser(username, password);
        res.status(200).json({ isValid });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to get a user by their username.
 */
const getUserByUsernameController = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to get a user by their name.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user data or an error message.
 */
const getUserByNameController = async (req, res) => {
    try {
        const { name } = req.params;
        const user = await getUserByName(name);
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to edit the name of a user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const editUserNameController = async (req, res) => {
    try {
        const { userID } = req.params;
        const { newName } = req.body;
        await editUserName(userID, newName);
        res.status(200).json({ message: "User name updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    signupController,
    updateBioController,
    addInterestToUserController,
    removeInterestFromUserController,
    createUserController,
    validateUserController,
    getUserByUsernameController,
    getUserByNameController,
    editUserNameController
};
