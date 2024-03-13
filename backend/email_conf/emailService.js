const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const path = require("path");
const dotenvResult = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});
console.log(dotenvResult);

console.log("EMAIL1:", process.env.EMAIL);
const OAuth2 = google.auth.OAuth2;
console.log("EMAIL2:", process.env.EMAIL);
const createTransporter = async () => {
  console.log("EMAILtransporter ", process.env.EMAIL);
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CALLBACK
  );
  console.log("EMAIL3:", process.env.EMAIL);
  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  console.log("EMAIL4:", process.env.EMAIL);
  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error("Failed to create access token:", err);
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
  console.log("EMAIL5:", process.env.EMAIL);
  console.log(process.env.CLIENT_ID);
  console.log(process.env.CLIENT_SECRET);
  console.log(process.env.REFRESH_TOKEN);
  console.log(accessToken);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

module.exports = { sendEmail };
