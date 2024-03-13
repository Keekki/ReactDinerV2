const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function getToken(code) {
  const url = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams({
    code: code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.CALLBACK_URI,
    grant_type: "authorization_code",
  });

  try {
    const response = await axios.post(url, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response.data);
    const { access_token, refresh_token } = response.data;
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
  } catch (error) {
    // Check if error.response exists before trying to access error.response.data
    if (error.response) {
      console.error("Error getting tokens:", error.response.data);
    } else {
      // Handle cases where error.response is undefined
      console.error("Error making request:", error.message);
    }
  }
}

getToken(process.env.REFRESH_TOKEN);
