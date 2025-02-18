const mysql = require('mysql2');  // Make sure you have mysql2 installed. If not, run npm install mysql2

// Set up the database connection
const db = mysql.createConnection({
  host: 'localhost',  // Your database host
  user: 'root',       // Your database username
  password: 'root',  // Your database password
  database: 'employee_system'  // Your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Database connected!');
  }
});

// Export the connection object to use it in other files
module.exports = db;
