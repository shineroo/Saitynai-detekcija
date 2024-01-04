var express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

const {OAuth2Client} = require('google-auth-library');

const tokenDictionary = {};

async function getUserData(access_token) {

  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
  //console.log('response',response);
  const data = await response.json();
  console.log('data',data);
  return data;
}

// what the fuck is this
router.get('/', async function(req, res, next) {

    const code = req.query.code;
    console.log(code);
    try {
        const redirectURL = "http://localhost:8080/api/oauth"
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
          );
        const r =  await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        const userData = await getUserData(oAuth2Client.credentials.access_token);
        const { name, given_name, family_name, picture } = userData;
        const role = "user";
        token = jwt.sign({ name, given_name, family_name, picture, role }, "secret", { algorithm: 'HS256'});


        console.log(token)
        tokenDictionary["sex"] = token;
      } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }
    
    res.redirect(303, 'http://localhost:5173/auth?t=' + token);
  
});

module.exports = router;