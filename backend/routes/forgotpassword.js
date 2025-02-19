    const express = require('express');
    // const router = express.Router();
    const jwt = require('jsonwebtoken');
    const nodemailer = require('nodemailer');
    // const db = require('employee_system'); // Make sure this points to your database connection
    const db = require('../db');  // Assuming db.js is at the root level of your project



    // Forgot password route
    router.post('/forgot-password', async (req, res) => {
    const { email } = req.body; // Extract email from the request body

    try {
        // Query to check if the user exists in the database
        const [users] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
        }

        // Create JWT token (for password reset)
        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Set up the email transporter using nodemailer
        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email account for sending emails
            pass: process.env.EMAIL_PASS, // Email password or app-specific password
        },
        });

        // Create reset password link using the generated token
        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // Send password reset email
        await transporter.sendMail({
        from: process.env.EMAIL_USER, // Sender email address
        to: users[0].email, // Recipient email (user's email)
        subject: 'Password Reset', // Email subject
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`, // Email body (HTML format)
        });

        // Send success response
        res.status(200).json({ message: 'Password reset link sent to email' });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Server error' });
    }
    });

    module.exports = router;
