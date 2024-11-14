const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5005;

// CORS setup (place it before session and route handling)
app.use(cors({
  origin: 'http://localhost:3000', // Allow your frontend
  credentials: true // Allow cookies to be sent along with requests
}));

// Body parser setup
app.use(express.json()); // Parse JSON requests

const session = require('express-session');

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeout: 10000 // 10 seconds
});

// Session setup
app.use(session({
  secret: 'yourSecretKey', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using https, false for http
  },
}));


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
      req.session.user = { username };
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});

app.put('/api/create', async (req, res) => {
  //req body is what has been received from json
  const { username, password, cardNumber, cvv, exp } = req.body;
  //put each in a query statement to insert into database
  const insertPaymentQuery = 'INSERT INTO Payment (cardNumber, cvv, expDate) VALUES (?, ?, ?)';
  const insertUserQuery = 'INSERT INTO Users (username, password, cardNumber) VALUES (?, ?, ?)';
  try {
    //execute queries as promise
    await db.promise().execute(insertPaymentQuery, [cardNumber, cvv, exp]);
    console.log('Inserted payment info:', { cardNumber, cvv, exp });
    //await is for waiting for previous to get executed first since user depends on payment
    const result = await db.promise().execute(insertUserQuery, [username, password, cardNumber]);
    console.log('User creation result:', result);
    // ensure both are good
    if (result && result[0].affectedRows > 0) {
      return res.status(201).json({ message: 'User created successfully' });
    } else {
      return res.status(400).json({ message: 'User creation failed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});

app.post('/api/cart', async (req, res) => {
  const { username, product_id, quantity, price, size, title } = req.body;

  const query = `
      INSERT INTO \`order\` (username, product_id, quantity, price, size, status, added_to_cart_at, title)
      VALUES (?, ?, ?, ?, ?, 'cart', NOW(), ?)
  `;

  try {
    await db.execute(query, [username, product_id, quantity, price, size, title]);
    res.status(200).json({ message: 'Item successfully added to cart' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
});

//



// Assuming you're using Express
app.delete('/api/cart/clear', async (req, res) => {
  const { username } = req.query;  // Get username from query parameter
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  try {
    const query = 'DELETE FROM `order` WHERE username = ? AND status = "cart"';
    const [result] = await db.promise().execute(query, [username]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Cart cleared successfully' });
    } else {
      res.status(400).json({ message: 'No items found in cart for this user' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});


app.get('/api/cart/:username', async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  try {
    const query = 'SELECT * FROM `order` WHERE username = ? AND status = "cart"';
    const [rows] = await db.promise().execute(query, [username]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database error:', error);
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
