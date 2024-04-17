const {
    loadPostsByFriendsAndInterests,
    loadPostsByInterests,
    createPost,
    deletePost
} = require('../services/post.services');

/**
 * Controller function to load posts based on friends and interests of the user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the loaded posts or an error message.
 */
const loadPostsByFriendsAndInterestsController = async (req, res) => {
    try {
        const userID = req.user.id; // Assuming user ID is available in the request object
        const posts = await loadPostsByFriendsAndInterests(userID);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to load posts based on user interests.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the loaded posts or an error message.
 */
const loadPostsByInterestsController = async (req, res) => {
    try {
        const userID = req.user.id; // Assuming user ID is available in the request object
        const posts = await loadPostsByInterests(userID);
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to create a new post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const createPostController = async (req, res) => {
    try {
        const { userID, postType, postContent, Interests_interestID } = req.body;
        await createPost(userID, postType, postContent, Interests_interestID);
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Controller function to delete a post.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with a success message or an error message.
 */
const deletePostController = async (req, res) => {
    try {
        const { postID } = req.params;
        await deletePost(postID);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    loadPostsByFriendsAndInterestsController,
    loadPostsByInterestsController,
    createPostController,
    deletePostController
};
