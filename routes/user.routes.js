const express = require('express');
const router = express.Router();

// Import controllers
const {
    signupController,
    updateBioController,
    addInterestToUserController,
    removeInterestFromUserController,
    createUserController,
    validateUserController,
    getUserByUsernameController,
    getUserByNameController,
    editUserNameController
} = require('../controllers/user.controllers');

//import validators
const { createUserValidation, updateUserValidation } = require('../validation/user-validator');


// Define routes
router.post('/user/signup', signupController);
router.put('/user/bio', updateBioController); // Update user bio
router.post('/user/interest', addInterestToUserController); // Add interest to user
router.delete('/user/interest', removeInterestFromUserController); // Remove interest from user
router.post('/user', createUserController); // Create a new user
router.post('/user/validate', validateUserController); // Validate user credentials
router.get('/user/username/:username', getUserByUsernameController); // Get user by username
router.get('/user/name/:name', getUserByNameController); // Get user by name
router.put('/user/name/:userID', editUserNameController); // Edit user name


module.exports = router;
