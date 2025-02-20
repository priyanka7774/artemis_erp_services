


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql2');
const tasksHandler = require('./routes/tasks'); 
const doertasks = require('./routes/doertasks');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET;
// const fs = require('fs');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// ✅ Use the router
app.use('/api', tasksHandler);
app.use('/api',doertasks);

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employee_system'
});

db.connect((err) => {
  if (err) console.error('Database connection failed:', err);
  else console.log('Connected to MySQL database');
});

// Register route
app.post('/api/register', async (req, res) => {
  console.log('Register route hit');
  const { username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the email already exists
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Store password as plain text
    const query = 'INSERT INTO users (username, email, phoneNumber, designation, dob, dateOfJoining, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await db.promise().query(query, [username, email, phoneNumber, designation, dob, dateOfJoining, password]);

    // Send success response
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
// app.post('/api/login', async (req, res) => {
  app.post('/login', async(req, res) => {
  console.log('Login attempt:', req.body);
  const { email, password } = req.body;

  try {
    const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // Compare input password to the stored plain-text password
    if (password === user.password) {
      // If password matches, generate a token
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Save weekly tasks:

// app.post('/api/save-tasks', async (req, res) => {
//   const { tasks } = req.body;

//   // Prepare data for the SQL query
//   try {
//     const promises = tasks.map((task) => {
//       const time = task.time;
//       const monday = task.monday.join(', ');
//       const tuesday = task.tuesday.join(', ');
//       const wednesday = task.wednesday.join(', ');
//       const thursday = task.thursday.join(', ');
//       const friday = task.friday.join(', ');
//       const saturday = task.saturday.join(', ');

//       const query = `
//         INSERT INTO weekly_task (time, monday, tuesday, wednesday, thursday, friday, saturday)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;

//       // Return a promise for each query
//       return new Promise((resolve, reject) => {
//         db.query(query, [time, monday, tuesday, wednesday, thursday, friday, saturday], (err, result) => {
//           if (err) reject(err);
//           else resolve(result);
//         });
//       });
//     });

//     // Wait for all database queries to finish
//     await Promise.all(promises);

//     res.status(200).json({ message: 'Tasks saved successfully!' });
//   } catch (error) {
//     console.error('Error saving task data:', error);
//     res.status(500).json({ message: 'Error saving task data', error });
//   }
// });


// 🟢 SERVER START
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
