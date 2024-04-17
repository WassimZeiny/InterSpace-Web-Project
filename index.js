const express = require('express'); 
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path'); 

// Load environment variables from .env file.
dotenv.config();

// Create an instance of the Express application
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data in the request body.

// Serve static files from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine for rendering dynamic content (using EJS templates).
app.set('view engine', 'ejs');

// Import routes
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const reactRoutes = require('./routes/react.routes');
const messageRoutes = require('./routes/msg.routes');
const friendRoutes = require('./routes/friends.routes');
const interestRoutes = require('./routes/interests.routes');

// Parse JSON request body
app.use(bodyParser.json());

// Use routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(reactRoutes);
app.use(messageRoutes);
app.use(friendRoutes);
app.use(interestRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});