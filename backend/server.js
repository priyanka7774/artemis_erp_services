// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Database Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root', // Your MySQL password (if any)
//   database: 'employee_system',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Database connected');
//   }
// });

// // API Route - Insert name and DOB into "doer" table
// app.post('/add-doer', (req, res) => {
//   const { name, dob } = req.body;
//   const query = 'INSERT INTO doer (name, dob) VALUES (?, ?)';

//   db.query(query, [name, dob], (err, result) => {
//     if (err) {
//       console.error('Error inserting data:', err);
//       res.status(500).json({ message: 'Database error', error: err.sqlMessage });
//     } else {
//       res.status(201).json({ message: 'Record added successfully', id: result.insertId });
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });









const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // Add your MySQL password if you have one
  database: 'employee_system'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


// app.post('/api/register', async (req, res) => {
//   const { username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword } = req.body;

//   // Validation for password match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     // Check if email already exists
//     const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Proceed with registration if email is not found
//     const sql = `
//       INSERT INTO users (username, email, phoneNumber, designation, dob, dateOfJoining, password,confirmPassword)
//       VALUES (?, ?, ?, ?, ?, ?, ? ,?)
//     `;

//     const values = [username, email, phoneNumber, designation, dob, dateOfJoining, password,confirmPassword];

//     await db.promise().query(sql, values);

//     res.status(201).json({ message: 'User is registered successfully' });

//   } catch (err) {
//     console.error('Failed to register user:', err);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

app.post('/api/register', async (req, res) => {
  const { username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword } = req.body;

  // 1. Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Registration failed - Password and Confirm Password do not match' });
  }

  try {
    // 2. Check if email already exists
    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Registration failed - Email already exists' });
    }

    // 3. Proceed with registration
    const sql = `
      INSERT INTO users (username, email, phoneNumber, designation, dob, dateOfJoining, password, confirm_password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword];

    await db.promise().query(sql, values);

    res.status(201).json({ message: 'User is registered successfully' });

  } catch (err) {
    console.error('Failed to register user:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Registration failed - Email already exists' });
    }

    res.status(500).json({ message: 'Registration failed - An unexpected error occurred' });
  }
});


// Login Route :
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Login failed' });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
});
