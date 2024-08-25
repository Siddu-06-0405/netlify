const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const path = require('path');
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

// Schema and model
const schema = new mongoose.Schema({
  name1: String,
  phone: String,
  email: String,
  text: String,
});
const Users = db.collection('responses'); // Collection name

app.post('/post', async (req, res) => {
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
