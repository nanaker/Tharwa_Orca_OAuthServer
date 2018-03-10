let oauth2orize = require('oauth2orize'),
passport = require('passport'),
models = require('./models'),
utils = require('./helpers/common/utils'),
sendgrid = require('./helpers/common/sendgrid'),
crypto = require('crypto'),
async = require('async'),
_ = require('lodash'),
modelsSequelize = require('./models'),
config = require('./config'),
tokenCtrl = require('./controllers/TokenCtrl');

// create OAuth 2.0 server
const server = oauth2orize.createServer();

/**
* Exchange user id and password for access tokens.
*
* The callback accepts the `client`, which is exchanging the user's name and password
* from the token request for verification. If these values are validated, the
* application issues an access token on behalf of the user who authorized the code.
*/
server.exchange(oauth2orize.exchange.password((client, username, password, scope, done) => {
const userScope = (scope) ? scope[0] : '';
let token = {};
let refreshToken = {};
nb = {};

async.series({
 code(callback) {
    modelsSequelize.Code.findOne({
      where: {
        userId: username
      }
    }).then((code) => {
      // check if user is valid
      if (_.isEmpty(code)) {
        return callback(true); // error
      }
      else { // verifier si le code n'a pas expire et si il est valide
      const expirationLeft = Math.floor((code.expires.getTime() - Date.now()) / 1000);
      if(expirationLeft<0) return callback('le code a expire');
      else {
        if (password!=code.codeId) return callback('le code n"est pas valide');
      }
      }
      callback();
    });
  },
  removeAllTokens(callback) {
    modelsSequelize.AccessTokens.destroy({
      where: {
        applicationId: client.applicationId,
        userId: username
      }
    });
    
    modelsSequelize.RefreshTokens.destroy({
      where: {
        applicationId: client.applicationId,
        userId: username
      }
    });
    
    callback();
  },
  accessToken(callback) {
    token = utils.uid(config.token.accessTokenLength);

    modelsSequelize.AccessTokens.create({
      tokenId: token,
      userId: username,
      applicationId: client.applicationId,
      expires: config.token.calculateExpirationDate(),
      scope: userScope
    }).then(() => {
      callback();
    }).catch(err => callback(err));
  },
  refreshToken(callback) {
    console.log(callback); // fabio
    refreshToken = utils.uid(config.token.refreshTokenLength);

    modelsSequelize.RefreshTokens.create({
      tokenId: refreshToken,
      userId: username,
      applicationId: client.applicationId,
      expires: config.token.calculateRefreshExpirationDate(),
      scope: userScope
    }).then(() => {
      callback();
    }).catch(err => callback(err));
  }  
}, (err) => {
  if (err) {
    console.log(err);
    return done(null);
  }

  // success
 
  return done(null, token, refreshToken, {
    expires_in: config.token.expiresIn,
  });
});
}));

/**
* Exchange the refresh token for an access token.
*
* The callback accepts the `client`, which is exchanging the client's id from the token
* request for verification.  If this value is validated, the application issues an access
* token on behalf of the client who authorized the code
*/
server.exchange(oauth2orize.exchange.refreshToken((client, refreshToken, scope, done) => {
let newToken = '';
let newRefreshToken = '';
let methodResponse = {};

async.series({
  // validate refresh token
  validateRefreshToken(callback) {
    tokenCtrl.validateRefreshToken({
      applicationId: client.applicationId,
      token: refreshToken
    },
      (err, data) => {
if (err) {
  return callback(err);
}

methodResponse = data;
return callback();
}
    );
  },
  // delete user's tokens
  removeAllTokens(callback) {
    // remove all token and refresh token
    tokenCtrl.removeacessTokens({
      applicationId: client.applicationId,
      username: methodResponse.userId
    },
      callback
    );
  },
  accessToken(callback) {
    // save new token
    tokenCtrl.saveNewAccessToken({
      applicationId: client.applicationId,
      username: methodResponse.userId,
      scope: methodResponse.scope
    },
      // callback method
      (err, data) => {
        // return error
if (err) {
  return callback(err);
}

        // save data
newToken = data;
return callback();
}
    );
  }
  
}, (err) => {
  if (err) {
    console.log(err);
    return done(null);
  }
  return done(null, newToken, newRefreshToken, {
    expires_in: config.token.expiresIn
  });
});
}));

exports.token = [
passport.authenticate(['basic', 'oauth2-client-password'], {
  session: false
}),
server.token(),
server.errorHandler()
];



exports.info = [
passport.authenticate('bearer', {
  session: false

}),
function (req, res) {
  
  models.AccessTokens.findOne({
    where: {
      tokenId: req.user.accessToken.tokenId
    }
  }).then((token) => {
    const expirationLeft = Math.floor((token.expires.getTime() - Date.now()) / 1000);
    res.json({
      applicationId: token.applicationId,
      userId: token.userId,
      expiresIn: expirationLeft
    });
  }).catch((err) => {
    res.status(err.status);
    res.json({
      error: err.message
    });
  });
}
];

exports.login = [
 
  function (req, res) {

       var id = req.body.userId;
        var Password = req.body.Pwd;
        var code = req.body.code;

        if(id == null ||  Password == null || code == null){ // un des parametres manquent
          return res.status(400).json({'error':'missing parameters'});
      }
      modelsSequelize.Users.findOne({
        where: {userId: id} })
     .then(function(userFound){
    if(userFound){ // si l'utilisateur existe
        const passwordHash = crypto.createHmac('sha256', Password).digest('hex');
        if (userFound.dataValues.password !== passwordHash) {
          return res.status(409).json({'error':"mot de passe incorrecte" });
        }
        else { //mot de passe correct  
          modelsSequelize.Code.destroy({
            where: { userId: id }});
           let nb =  utils.nbalea(4);
           modelsSequelize.Code.create({
            userId: id,
            codeId: nb,
            expires: config.token.calculateExpirationDate()
          }).then(function(newCode){
          let nb=newCode.codeId;
          modelsSequelize.Users.findOne({
          attributes:['numTel'],
          where: { userId: id}
          }).then((user) => {
          if (user) // si le numero de tel existe
          {  if(code=='1'){sendgrid.sendsms(user.numTel,nb); } // envoyer le code par sms
             else{sendgrid.sendEmail(id, nb); }     } // envoyer le code par email 
          else return res.status(409).json({'error':"impossible de trouver le numero de telephone" });
          }).catch(err => {console.error('impossible de trouver le numero de telephone ', err);});
          return res.status(200).json({'succe':"l'utilisateur est verifie" });
          }).catch(err => {console.error('Unable to add code:', err);});
        }}
        else{ //utilisateur n'existe pas
        return res.status(409).json({'error':"l'utilisateur n'existe pas" });  }
    })
    .catch(function(err){
        return res.status(500).json({'error':'Can\'t verify parameters'});
        console.log(err);
    }); 
    
  }
  ];


