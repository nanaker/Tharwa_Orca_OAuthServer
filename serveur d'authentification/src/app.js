let oauth2orize = require('oauth2orize'),

models = require('./models'),
utils = require('./helpers/common/utils'),
sendgrid = require('./helpers/common/sendgrid'),
crypto = require('crypto'),
async = require('async'),
_ = require('lodash'),
modelsSequelize = require('./models'),
config = require('./config'),
tokenCtrl = require('./controllers/TokenCtrl');


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

// added helmet framework pour securisé les entetes http 
app.use(helmet());

// added hpp framework pour proteger contre  l'attaque de pollution de paramètre HTTP 
app.use(hpp());

app.use(passport.initialize());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

require('./controllers/AuthCtrl');

// token endpoints
app.post('/oauth/code',oauth2.login);

app.post('/oauth/login', oauth2.token);//pour s'authentifier cote client //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=password + username(@mail)+password=''+code=0 (mail )ou 1(mobile) )===>access token + refresh token + expire 
app.post('/oauth/refresh', oauth2.token);//ou bien pour creer un nv access token a partir d'un refresh token lors de son l'expiration // 
                                          //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=refresh_token + refresh_token=''===>access token + refresh token + expire
app.get('/oauth/info', oauth2.info);// pour avoir les infos du token // autorization bearer ( tokenid)===> ("applicationId","userId","expiresIn" ) 


// create server
http.createServer(app).listen(8080, () => {
  console.log(`Express HTTP server listening on port 8080`);
});
