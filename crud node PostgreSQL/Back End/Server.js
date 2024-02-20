const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

app.use(cors());

const client = new Client({
    user: 'user',
    host: '172.17.0.2',
    database: 'Crud',
    password: 'root',
    port: 5432, 
});

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    client.query('SELECT * FROM students', (err, result) => {
        if (err) {
            res.status(400).send(err);
          }
          res.status(200).send(result.rows);
        });
});

app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  client.query('DELETE FROM students WHERE student_no = $1', [id], (err, result) => {
      if (err) {
          res.status(400).send(err);
      } else {
          res.status(200).send('User deleted successfully.');
      }
  });
});

app.post('/users', (req, res) => {
    const {first_name, last_name, age, phone_no } = req.body;
    client.query('INSERT INTO students (first_name, last_name, age, phone_no) VALUES ($1, $2, $3, $4)', [first_name, last_name, age, phone_no], (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).send('User added : ' + first_name + ' ' + last_name);
        }
    });

});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const {first_name, last_name, age, phone_no } = req.body;
    client.query('UPDATE students SET first_name = $1, last_name = $2, age = $3, phone_no = $4 WHERE student_no = $5', [first_name, last_name, age, phone_no, id], (err, result) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send('User updated successfully.');
        }
    });
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
