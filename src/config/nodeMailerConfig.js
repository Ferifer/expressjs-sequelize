// nodemailerConfig.js
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Skip certificate validation if needed
  },
  secure: process.env.SMTP_SECURE === "true", // Use secure connection if set to true
});

module.exports = transporter;
