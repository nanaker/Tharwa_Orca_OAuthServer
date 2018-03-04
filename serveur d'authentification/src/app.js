const dotenv = require('dotenv');

// load environment variables
dotenv.load();

const express = require('express');
const passport = require('passport');
const oauth2 = require('./oauth2');
const bodyParser = require('body-parser');
const http = require('http');

// security
const helmet = require('helmet');
const hpp = require('hpp');

const app = express();

// added helmet framework
app.use(helmet());

// added hpp framework
app.use(hpp());

app.use(passport.initialize());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

require('./controllers/AuthCtrl');

// token endpoints
app.post('/oauth/login', oauth2.token);//pour s'authentifier cote client //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=password + username(@mail)+password='')===>access token + refresh token + expire 
app.post('/oauth/refresh', oauth2.token);//ou bien pour creer un nv access token a partir d'un refresh token lors de son l'expiration // 
                                          //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=refresh_token + refresh_token=''===>access token + refresh token + expire
app.get('/oauth/info', oauth2.info);// pour avoir les infos du token // autorization bearer ( tokenid)===> ("applicationId","userId","expiresIn" ) 


// create server
http.createServer(app).listen(8000, () => {
  console.log(`Express HTTP server listening on port 8000`);
});
