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
const cors = require('cors');

// use it before all route definitions
app.use(cors());
app.use(function (req, res, next)
 {
  
      // Website you wish to allow to connect
      //res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.68:4200');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
  
      // Pass to next layer of middleware
      next();
  });

require('./controllers/AuthCtrl');

// token endpoints
app.post('/oauth/login', oauth2.token);//pour s'authentifier cote client //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=password + username(@mail)+password='')===>access token + refresh token + expire 
app.post('/oauth/refresh', oauth2.token);//ou bien pour creer un nv access token a partir d'un refresh token lors de son l'expiration // 
                                          //doit fournir les infos de l'appli autorization basic ( appId,secret)
                                         //+body ( grant-type=refresh_token + refresh_token=''===>access token + refresh token + expire
app.get('/oauth/info', oauth2.info);// pour avoir les infos du token // autorization bearer ( tokenid)===> ("applicationId","userId","expiresIn" ) 


// create server
http.createServer(app).listen(4000, () => {
  console.log(`Express HTTP server listening on port 4000`);
});
