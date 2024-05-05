const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const OAuth2 = google.auth.OAuth2;

// Creating a transporter that sets the Google credentials for nodemailer
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CALLBACK
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  try {
    const { token } = await oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: token,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    return transporter;
  } catch (err) {
    console.error("Failed to create access token:", err);
    throw err; // Rethrow the error to handle it in the calling function
  }
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

module.exports = { sendEmail };
