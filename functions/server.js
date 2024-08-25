const express = require('express');
const serverless = require('serverless-http');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

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

const Users = db.collection('responses'); // Collection name

app.post('.netlify/functions/server/post', async (req, res) => {
  try {
    const { name1, phone, email, text } = req.body;
    await Users.insertOne({ name1, phone, email, text });
    res.send("Response recorded");
  } catch (err) {
    console.error("Error saving the document:", err);
    res.status(500).send("An error occurred while saving the response.");
  }
});

module.exports.handler = serverless(app);
