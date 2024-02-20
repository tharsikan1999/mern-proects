const express =require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();  


app.use(bodyParser.json());

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
  });

  app.get('/api/students', (req, res) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error');
        return;
      }
      else{
        res.status(200).send(result);
      }
  })

  });

  app.post('/api/students', (req, res) => {
    const student = req.body;
    const sql = 'INSERT INTO students SET ?';
    db.query(sql, student, (err, result) => {
      if (err) {
        res.status(500).send('Error');
        return;
      }
      else{
        res.status(201).send('Student added successfully');
      }});

      
  })


  app.put('/api/students/:id', (req, res) => {
    const id = req.params.id;
    const updatedStudent = req.body;
    const sql = 'UPDATE students SET ? WHERE student_no = ?';
    db.query(sql, [updatedStudent, id], (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send('Student updated successfully');
    });
  });

  app.delete('/api/students/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM students WHERE student_no = ?';
    db.query(sql, id, (err, result) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.status(200).send('Student deleted successfully');
    });
  });

app.listen('3000', () => console.log('Server started on port 3000')
)

