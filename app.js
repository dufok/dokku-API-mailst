app.post('/sendEmail', async (req, res) => {
  const { to, subject, html, user, pass } = req.body;

  // Configure your Postfix settings here
  let transporter = nodemailer.createTransport({
    host: 'localhost',
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