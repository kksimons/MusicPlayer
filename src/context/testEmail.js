const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'streamsonic0@gmail.com',
    pass: 'StreamSonic.1',
  },
});

const mailOptions = {
  from: 'streamsonic0@gmail.com',
  to: 'recipient-email@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from the test script.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
