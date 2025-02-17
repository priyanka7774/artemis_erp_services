








// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// // forgot password :
// const router = express.Router();
// const User = require('../models/User'); // Assume you have a User model
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Create a connection to the MySQL database
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root', // Add your MySQL password if you have one
//   database: 'employee_system'
// });

// // Connect to MySQL
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });
// =========================

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

// ==============================

// app.post('/api/register', async (req, res) => {
//   const { username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword } = req.body;

//   // 1. Check if password and confirmPassword match
//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Registration failed - Password and Confirm Password do not match' });
//   }

//   try {
//     // 2. Check if email already exists
//     const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'Registration failed - Email already exists' });
//     }

//     // 3. Proceed with registration
//     const sql = `
//       INSERT INTO users (username, email, phoneNumber, designation, dob, dateOfJoining, password, confirm_password)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword];

//     await db.promise().query(sql, values);

//     res.status(201).json({ message: 'User is registered successfully' });

//   } catch (err) {
//     console.error('Failed to register user:', err);

//     if (err.code === 'ER_DUP_ENTRY') {
//       return res.status(400).json({ message: 'Registration failed - Email already exists' });
//     }

//     res.status(500).json({ message: 'Registration failed - An unexpected error occurred' });
//   }
// });


// // Login Route :
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

//   db.query(sql, [username, password], (err, results) => {
//     if (err) {
//       console.error('Login error:', err);
//       return res.status(500).json({ message: 'Login failed' });
//     }

//     if (results.length > 0) {
//       res.status(200).json({ message: 'Login successful', user: results[0] });
//     } else {
//       res.status(401).json({ message: 'Invalid username or password' });
//     }
//   });
// });



// // Fotgot Password :
// // 🔑 Secret Key for JWT
// const JWT_SECRET = process.env.JWT_SECRET;

// // 🚀 Step 1: Request Reset Link
// router.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate Reset Token (Valid for 15 mins)
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

//     // Send Email with Reset Link (Nodemailer)
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetLink = `http://localhost:3000/reset-password/${token}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset',
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//     });

//     res.status(200).json({ message: 'Password reset link sent to email' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // 🚀 Step 2: Reset Password
// router.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid or expired token' });
//   }
// });

// module.exports = router;





// =======

// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// require('dotenv').config();
// const forgotPasswordRoutes = require('./routes/forgotpassword');


// const app = express();
// const port = 5000;

// const JWT_SECRET = process.env.JWT_SECRET;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MySQL Connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'employee_system'
// });

// db.connect((err) => {
//   if (err) console.error('Database connection failed:', err);
//   else console.log('Connected to MySQL database');
// });

// // Mount forgot password routes
// app.use('/api/auth', forgotPasswordRoutes);
// const forgotPasswordRoute = require('./routes/forgotpassword');
// app.use('/api', forgotPasswordRoute);  // Add this line to include the route

// =============
// // 🟢 REGISTER ROUTE
// app.post('/api/register', async (req, res) => {
//   const { username, email, phoneNumber, designation, dob, dateOfJoining, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   try {
//     const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const sql = `
//       INSERT INTO users (username, email, phoneNumber, designation, dob, dateOfJoining, password)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     const values = [username, email, phoneNumber, designation, dob, dateOfJoining, hashedPassword];
//     await db.promise().query(sql, values);

//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (err) {
//     console.error('Registration failed:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


//   app.post('/api/login', (req, res) => {
//     const { username, password } = req.body;
  
//     if (!username || !password) {
//       return res.status(400).json({ message: 'Username and password are required' });
//     }
  
//     const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  
//     db.query(sql, [username, password], (err, results) => {
//       if (err) {
//         console.error('Login error:', err);
//         return res.status(500).json({ message: 'Login failed' });
//       }
  
//       if (results.length > 0) {
//         res.status(200).json({ message: 'Login successful', user: results[0] });
//       } else {
//         res.status(401).json({ message: 'Invalid username or password' });
//       }
//     });
//   });
  























const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();
const forgotPasswordRoutes = require('./routes/forgotpassword');

const app = express();
const port = 5000;

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(cors());
app.use(express.json());

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

// Mount forgot password routes
app.use('/api/auth', forgotPasswordRoutes);
const forgotPasswordRoute = require('./routes/forgotpassword');
app.use('/api', forgotPasswordRoute);

// Register route (storing plain-text password)
router.post('/register', async (req, res) => {
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

// // Ensure login compares plain-text password
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

//     if (users.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const user = users[0];

//     // Compare input password to the stored plain-text password
//     if (password === user.password) {
//       // If password matches, generate a token or continue with login success
//       const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       res.status(200).json({ message: 'Login successful', token });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });




// Registering login route properly
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[0];

    // Compare input password to the stored plain-text password
    if (password === user.password) {
      // If password matches, generate a token or continue with login success
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





// POST API to Save Weekly Tasks
router.post('/api/save-tasks', (req, res) => {
  const tasksData = req.body;

  // Save tasks data into a JSON file (tasksData.json)
  fs.writeFile('tasksData.json', JSON.stringify(tasksData, null, 2), (err) => {
    if (err) {
      console.error('Error saving tasks data:', err);
      res.status(500).json({ message: 'Failed to save tasks data' });
    } else {
      console.log('Tasks data saved successfully');
      res.status(200).json({ message: 'Tasks data saved successfully' });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Employee System!');
});

// 🟢 SERVER START
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});









