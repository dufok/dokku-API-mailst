const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 1314;

// Don't forget to include this line to parse JSON request bodies
app.use(express.json());

const YOUR_SECRET_API_KEY = process.env.API_KEY;
const YOUR_MAIL_SERVER = process.env.MAIL_SERVER;

// Middleware to check API key
function checkApiKey(req, res, next) {
  const apiKey = req.headers['mailst-api-key'];
  if (apiKey === YOUR_SECRET_API_KEY) {
    next();
  } else {
    res.status(401).send('Unauthorized: Invalid API key');
  }
}

// Apply middleware to /sendEmail endpoint
app.post('/sendEmail', checkApiKey, async (req, res) => {
  const { to, subject, html, user, pass } = req.body;

  // Configure your Postfix settings here
  let transporter = nodemailer.createTransport({
    host: YOUR_MAIL_SERVER,
    port: 587,
    secure: false,
    auth: {
      user: user,  // Dynamic based on request
      pass: pass   // Dynamic based on request
    }
  });

  try {
    await transporter.sendMail({
      from: user,  // Dynamic based on request
      to: to,
      subject: subject,
      html: html
    });
    res.status(200).send('Email sent');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Mail API listening at http://localhost:${port}`);
});
