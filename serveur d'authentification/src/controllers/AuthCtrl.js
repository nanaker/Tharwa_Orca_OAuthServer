

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const _ = require('lodash');

const models = require('../models');

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate either users or clients based on an access token
 * (aka a bearer token).  If a user, they must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(new BearerStrategy(
    (accessToken, done) => {
      models.AccessTokens.findOne({
        where: {
          tokenId: accessToken
        },
        include: [
				{ model: models.Users },
				{ model: models.Applications }
        ]
      }).then((accessToken) => {
			// no token found
        if (_.isEmpty(accessToken)) {
          return done(null, false);
        }

			// check if token has expired
        const currentDateTime = new Date();
        if (accessToken.expires <= currentDateTime) {
          return done(null, false);
        }

        const user = accessToken.dataValues.User.dataValues;

			// no user found
        if (_.isEmpty(user)) {
          return done(null, false);
        }

			

        const returnObject = {
          user,
          accessToken
        };

        done(null, returnObject, accessToken.dataValues.scope);
      });
    }
));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
passport.use(new BasicStrategy(
    (appid, secr, done) => {
      models.Applications.findOne({
        where: {
          applicationId: appid
        }
      }).then((application) => {

        console.log("Debug AuthCtrl.appid " + appid);
			// check if the application is valid
        if (_.isEmpty(application)) {
          return done(true); // error
        }

        console.log("secret " + application.dataValues.secret);
        
			// check if the application secret is valid
        if (application.dataValues.secret != secr) {
          return done(true); // error
        }
        console.log("Validation OK");
     //   console.log("tokenId " + accessToken.dataValues.tokenId);
        return done(null, application.dataValues);
      });
    }
));

passport.use(new ClientPasswordStrategy(
    (clientId, clientSecret, done) => {
      models.Applications.findOne({
        where: {
          applicationId: clientId
        }
      }).then((application) => {
            // check if the application is valid
        if (!_.isEmpty(application)) {
                // check if the application secret is valid
          if (application.dataValues.secret == clientSecret) {
                    // valid
            return done(null, application.dataValues);
          }
        }

        return done(null, false);
      });
    }
));
