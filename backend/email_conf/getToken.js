const axios = require("axios");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

async function getRefreshToken(code) {
  try {
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.CALLBACK_URI,
      grant_type: "authorization_code",
    });

    console.log(data); // { access_token, expires_in, refresh_token, scope, token_type }
  } catch (error) {
    console.error(error);
  }
}

// Call the function with the authorization code
getRefreshToken(
  "4/0AeaYSHDy4zVGrMQu7IMa6YKQ3XOZ_OI7KvCdFFb1Jlq2Gl8Zi5zVP9mqE6LL4z1_M7SPQA&scope=https://mail.google.com/"
);
