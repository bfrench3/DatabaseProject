// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5005;
app.use(cors());
app.use(express.json()); // Parse JSON requests

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000 // 10 seconds
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});

app.get('/products', (req, res) => {
  db.query('SELECT * FROM product', (err, results) => {
    if (err) {
      console.error('Database query error:', err); // Log the error
      return res.status(500).send('Error fetching data');
    }
    res.json(results); // Send data as JSON if successful
  });
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

//ERRORS IN CREATING USERS

app.put('/api/create', async (req, res) => {
  const { username, password, cardNumber } = req.body;
  const sql = 'INSERT INTO Users (username, password, cardNumber) VALUES (?, ?, ?)';

  try {
    // Attempt to insert into the Payment table
    await db.execute('INSERT INTO Payment (cardNumber) VALUES (?)', [cardNumber]);

    console.log('Attempting to create user with:', { username, password, cardNumber }); // Log input data
    const result = await db.execute(sql, [username, password, cardNumber]);

    console.log('DB execute result:', result); // Log the complete result

    if (result && typeof result === 'object' && 'affectedRows' in result) {
      if (result.affectedRows > 0) {
        return res.status(201).json({ message: 'User created successfully' });
      }
    }

    // Handle case where no rows were affected
    //res.status(400).json({ message: 'User creation failed' });

  } catch (error) {
    // Ignore specific error types you want to bypass
    if (error.message.includes('some specific message or error code')) {
      // If you want to ignore this error, do nothing
      console.log('Ignored error:', error.message);
      return; // Exit the function early if you want to ignore the error
    }

    // For all other errors, log them and send a response
    console.error('Database error:', error); // Log the error stack
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});



//DEBUGGING PURPOSES, UNCOMMENT IF ERRORS STARTING BACKEND 
//listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME); 
