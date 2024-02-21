const express = require('express');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://192.168.8.107:27017';
const dbName = 'students';
const collectionName = 'details';

const client = new MongoClient(url);

// Connect to MongoDB
client.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }
  console.log('Connected to MongoDB');

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
