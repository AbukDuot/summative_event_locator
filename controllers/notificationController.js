// controllers/notificationController.js

const sendEmail = (to, subject, message) => {
    // Simulating sending an email
    console.log(`Sending email to ${to} with subject: ${subject}`);
    return { to, subject, message };
};

module.exports = { sendEmail };
