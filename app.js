const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/sendEmail', async (req, res) => {
  const { to, subject, html } = req.body;

  // Configure your Postfix settings here
  let transporter = nodemailer.createTransport({
    host: 'your-postfix-server.com',
    port: 587,
    secure: false,
    auth: {
      user: 'your-email@example.com',
      pass: 'your-password'
    }
  });

  try {
    await transporter.sendMail({
      from: 'your-email@example.com',
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
