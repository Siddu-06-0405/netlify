const express = require("express");
const serverless = require('serverless-http');
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3019;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb+srv://surya:surya123@cluster0.wjg4fyi.mongodb.net', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Mongoose Schema and Model
const schema = new mongoose.Schema({
    name1: String,
    phone: String,
    email: String,
    text: String,
});
const Users = mongoose.model("responses", schema); // Collection name

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Handle POST requests
app.post('/post', async (req, res) => {
    try {
        const { name1, phone, email, text } = req.body;
        const user = new Users({ name1, phone, email, text });
        await user.save();
        res.send("Response recorded");
    } catch (err) {
        console.error("Error saving the document:", err);
        res.status(500).send("An error occurred while saving the response.");
    }
});

// Start the server locally
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}

// Serverless configuration
module.exports.handler = serverless(app);
