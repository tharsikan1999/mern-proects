const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();



app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://192.168.8.107:27017';
const dbName = 'students';
const collectionName = 'details';

mongoose.connect(`${url}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const studentCollection = mongoose.connection.collection(collectionName);

app.get('/students', async (req, res) => {
  try {
    const data = await studentCollection.find().toArray();
    res.status(200).send(data);
  } catch (err) {
    console.error('Error fetching data from database:', err);
    res.status(500).send('Error fetching data from database');
  }
});


app.post('/students', async (req, res) => {
  try {
    const data = req.body;
    await studentCollection.insertOne(data);
    res.status(200).send('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data into database:', err);
    res.status(500).send('Error inserting data into database');
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
    const result = await studentCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 1) {
      return res.status(200).send('Data deleted successfully');
    } else {
      return res.status(404).send('Student not found');
    }
  } catch (err) {
    console.error('Error deleting data from database:', err);
    return res.status(500).send('Error deleting data from database');
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const objectId = new mongoose.Types.ObjectId(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send('Invalid ID format');
    }
    const data = req.body;
    const result = await studentCollection.updateOne({ _id: objectId }, { $set: data });
    if (result.modifiedCount === 1) {
      return res.status(200).send('Data updated successfully');
    } else {
      return res.status(404).send('Student not found');
    }
  } catch (err) {
    console.error('Error updating data in database:', err);
    return res.status(500).send('Error updating data in database');
  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
