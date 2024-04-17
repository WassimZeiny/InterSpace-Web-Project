/**
 * Updates the bio of a specific user.
 * @param {number} userID The unique identifier of the user.
 * @param {string} bio The new bio text to update.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */

const signup = async (username, email, pass) => {
    try{
        let sql = `
        INSERT INTO user (userName, userEmail, userPass)
        VALUES (?, ?, ?)`;
        const signup = await query(sql, [username, email, pass]);
        return signup;
    } catch (error){
        throw new Error(error);
    }
};
const updateBio = async (userID, bio, query) => {
    try {
        let sql = `
        UPDATE user
        SET bio = ?
        WHERE userID = ?`;

        const bios = await query(sql, [bio, userID]);
        return bios;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Adds an interest to a specific user.
 * @param {number} userID The unique identifier of the user.
 * @param {number} interestID The unique identifier of the interest to add.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const addInterestToUser = async (userID, interestID, query) => {
    try {
        let sql = `
        INSERT INTO user (user_userID, Interests_interestID)
        VALUES (?, ?)`;

        const interest = await query(sql, [userID, interestID]);
        return interest;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Removes an interest from a specific user.
 * @param {number} userID The unique identifier of the user.
 * @param {number} interestID The unique identifier of the interest to remove.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const removeInterestFromUser = async (userID, interestID, query) => {
    try {
        let sql = `
        DELETE FROM user
        WHERE user_userID = ? AND Interests_interestID = ?`;

        const removeInterest = await query(sql, [userID, interestID]);
        return removeInterest;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Creates a new user with the given details.
 * @param {string} username The username of the new user.
 * @param {string} email The email address of the new user.
 * @param {string} password The password of the new user.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const createUser = async (username, email, password, query) => {
    try {
        let sql = `
        INSERT INTO user (userName, userEmail, userPass)
        VALUES (?, ?, ?)`;

        const user = await query(sql, [username, email, password]);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Validates user credentials.
 * @param {string} username The username of the user to validate.
 * @param {string} password The password of the user to validate.
 * @param {function} query The database query function.
 * @returns {boolean} Returns true if the user is valid, false otherwise.
 * @throws {Error} Throws an error if the database operation fails.
 */
const validateUser = async (username, password, query) => {
    try {
        let sql = `
        SELECT *
        FROM user
        WHERE userName = ? AND userPass = ?`;

        const user = await query(sql, [username, password]);
        return user.length > 0;
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a user by their username.
 * @param {string} username The username to search for.
 * @returns {Object} The user object if found, null otherwise.
 * @throws {Error} Throws an error if the database operation fails or the user is not found.
 */
const getUserByUsername = async (username, query) => {
    try {
        const sql = `SELECT * FROM user WHERE userName = ?`;
        const user = await query(sql, [username]);
        return user[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Retrieves a user by their name.
 * @param {string} name The name to search for.
 * @returns {Object} The user object if found, null otherwise.
 * @throws {Error} Throws an error if the database operation fails or the user is not found.
 */
const getUserByName = async (name, query) => {
    try {
        const sql = `SELECT * FROM user WHERE name = ?`;
        const user = await query(sql, [name]);
        return user[0];
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * Updates the name of a specific user.
 * @param {number} userID The unique identifier of the user.
 * @param {string} newName The new name to update.
 * @param {function} query The database query function.
 * @throws {Error} Throws an error if the database operation fails.
 */
const editUserName = async (userID, newName, query) => {
    try {
        const sql = `UPDATE user SET name = ? WHERE userID = ?`;
        const edit = await query(sql, [newName, userID]);
        return edit;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    signup,
    updateBio,
    addInterestToUser,
    removeInterestFromUser,
    createUser,
    validateUser,
    getUserByUsername,
    getUserByName,
    editUserName
};
