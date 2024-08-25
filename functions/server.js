const { MongoClient } = require('mongodb');
const serverless = require('serverless-http');
const express = require('express');

const app = express();
app.use(express.json());

// MongoDB connection setup
const uri = 'mongodb+srv://surya:surya123@cluster0.wjg4fyi.mongodb.net';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(err => {
    if (err) {
        console.error('Failed to connect to MongoDB', err);
        return;
    }
    db = client.db('databaseName'); // replace 'databaseName' with your actual database name
});

// Route handler
app.post('/post', async (req, res) => {
    try {
        const { name1, phone, email, text } = req.body;
        await db.collection('responses').insertOne({ name1, phone, email, text });
        res.send("Response recorded");
    } catch (err) {
        console.error("Error saving the document:", err);
        res.status(500).send("An error occurred while saving the response.");
    }
});

module.exports.handler = serverless(app);
