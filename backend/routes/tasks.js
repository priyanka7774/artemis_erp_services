
 
// const express = require('express');
// const mysql = require('mysql2');

// const bodyParser = require('body-parser');

// const router = express.Router();

// router.use(bodyParser.json());

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'employee_system',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ Database connection failed:', err.stack);
//     return;
//   }
//   console.log('✅ Connected to the database');
// });




// router.post('/save-tasks', async (req, res) => {
//   let { tasks } = req.body;

//   console.log("✅ Received tasks in correct format:", JSON.stringify(tasks, null, 2));

//   if (!tasks || !Array.isArray(tasks)) {
//     return res.status(400).json({ message: 'Invalid tasks data', receivedData: tasks });
//   }

//   try {
//     await Promise.all(
//       tasks.map((task) => {
//         const query = `
//           INSERT INTO weekly_task (time, monday, tuesday, wednesday, thursday, friday, saturday)
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//           task.time || '',
//           task.monday || '',
//           task.tuesday || '',
//           task.wednesday || '',
//           task.thursday || '',
//           task.friday || '',
//           task.saturday || '',
//         ];

//         return new Promise((resolve, reject) => {
//           db.query(query, values, (err, result) => {
//             if (err) reject(err);
//             else resolve(result);
//           });
//         });
//       })
//     );

//     res.status(200).json({ message: 'Tasks saved successfully!' });
//   } catch (err) {
//     console.error('❌ Database Error:', err);
//     res.status(500).json({ message: 'Database error', error: err.message });
//   }
// });

// module.exports = router;



// =====working ===

// const express = require('express');
// const mysql = require('mysql2/promise'); // ✅ Use promise-based MySQL
// const bodyParser = require('body-parser');

// const router = express.Router();

// router.use(bodyParser.json());

// const db = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'employee_system',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// // ✅ Test route
// router.get('/test', (req, res) => {
//   res.send('Tasks route is working!');
// });

// // ✅ Save tasks endpoint
// router.post('/save-tasks', async (req, res) => {
//   let { tasks } = req.body;

//   console.log("✅ Received tasks in correct format:", JSON.stringify(tasks, null, 2));

//   if (!tasks || !Array.isArray(tasks)) {
//     return res.status(400).json({ message: 'Invalid tasks data', receivedData: tasks });
//   }

//   try {
//     const connection = await db.getConnection();
//     await Promise.all(
//       tasks.map(async (task) => {
//         const query = `
//           INSERT INTO weekly_task (time, monday, tuesday, wednesday, thursday, friday, saturday)
//           VALUES (?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//           task.time || '',
//           task.monday || '',
//           task.tuesday || '',
//           task.wednesday || '',
//           task.thursday || '',
//           task.friday || '',
//           task.saturday || '',
//         ];

//         await connection.query(query, values);
//       })
//     );
//     connection.release();

//     res.status(200).json({ message: 'Tasks saved successfully!' });
//   } catch (err) {
//     console.error('❌ Database Error:', err);
//     res.status(500).json({ message: 'Database error', error: err.message });
//   }
// });

// // ✅ Export router
// module.exports = router;




// ============

// 11:50

// const express = require('express');
// const mysql = require('mysql2/promise'); 
// const bodyParser = require('body-parser');
// const pool = require('../db'); 

// const router = express.Router();

// router.use(bodyParser.json());



// // ✅ Test route
// router.get('/test', (req, res) => {
//   res.send('Tasks route is working!');
// });


// router.post('/save-tasks', async (req, res) => {
//   const { tasks } = req.body;

//   if (!Array.isArray(tasks) || tasks.length === 0) {
//       return res.status(400).json({ error: 'Invalid task data' });
//   }

//   try {
//       const insertQuery = `
//           INSERT INTO weekly_task (time, monday, tuesday, wednesday, thursday, friday, saturday)
//           VALUES ? 
//           ON DUPLICATE KEY UPDATE
//           monday=VALUES(monday),
//           tuesday=VALUES(tuesday),
//           wednesday=VALUES(wednesday),
//           thursday=VALUES(thursday),
//           friday=VALUES(friday),
//           saturday=VALUES(saturday);
//       `;

//       const values = tasks.map(task => [
//           task.time, 
//           task.monday, 
//           task.tuesday, 
//           task.wednesday, 
//           task.thursday, 
//           task.friday, 
//           task.saturday
//       ]);

//       await pool.query(insertQuery, [values]);

//       res.json({ message: 'Tasks saved successfully' });
//   } catch (err) {
//       console.error('❌ Error saving tasks:', err);
//       res.status(500).json({ error: 'Database error' });
//   }
// });

// // // ✅ Export router
// module.exports = router;

const express = require('express');
const db = require('../db'); 
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

// ✅ Test route
router.get('/test', (req, res) => {
  res.send('Tasks route is working!');
});

router.post('/save-tasks', (req, res) => {
  const { tasks } = req.body;

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return res.status(400).json({ error: 'Invalid task data' });
  }

  const insertQuery = `
    INSERT INTO weekly_task (time, monday, tuesday, wednesday, thursday, friday, saturday)
    VALUES ? 
    ON DUPLICATE KEY UPDATE
    monday=VALUES(monday),
    tuesday=VALUES(tuesday),
    wednesday=VALUES(wednesday),
    thursday=VALUES(thursday),
    friday=VALUES(friday),
    saturday=VALUES(saturday);
  `;

  const values = tasks.map(task => [
    task.time,
    task.monday,
    task.tuesday,
    task.wednesday,
    task.thursday,
    task.friday,
    task.saturday
  ]);

  db.query(insertQuery, [values], (err, result) => {
    if (err) {
      console.error('❌ Error saving tasks:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Tasks saved successfully' });
  });
});




// to fetch into task report :
// ✅ Corrected route to fetch tasks
router.get('/get-tasks', (req, res) => {
  // const selectQuery = "SELECT * FROM weekly_task ORDER BY time ASC";
  const selectQuery = "SELECT * FROM weekly_task WHERE time NOT IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') ORDER BY time ASC";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("❌ Error fetching tasks:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // Send fetched tasks as JSON
  });
});



// ✅ Export router
module.exports = router;
