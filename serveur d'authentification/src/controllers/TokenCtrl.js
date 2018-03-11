/**
 * Date Created: 17/01/2017
 */

// Required files
let models = require('../models'),
	 config = require('../config'),
	 utils = require('../helpers/common/utils');

/**
 * Token length enum {Number}
 */
const TokenLengthEnum = Object.freeze({
  DEFAULT: 256, // Default length to use
  TOKEN: config.token.accessTokenLength, // Token length
  REFRESH_TOKEN: config.token.refreshTokenLength, // Refresh token length
  PASSWORD: config.token.passwordTokenLength // password token length
});

/**
 * Token Expiration enum {Date}
 */
const TokenExpirationEnum = Object.freeze({
  DEFAULT: new Date(new Date().getTime() + (this.expiresIn * 1000)), // Default date : 1 hour
  TOKEN: config.token.calculateExpirationDate(), // Token expiration date
  REFRESH_TOKEN: config.token.calculateRefreshExpirationDate(), // Refresh token expiration date
  PASSWORD: config.token.calculateExpirationDate(), // Password expiration date
});


/**
 * Create a random token from length
 * @param tokenLengthEnum {TokenLengthEnum} : Value from TokenLengthEnum enum object
 * @return {String} Returns a new token
 */
const createToken = function (tokenLengthEnum) {
  return utils.uid(tokenLengthEnum);
};

/**
 * Creates a new token and returns the new generated token
 * @param req {Object} : Request object that has: applicationId {string}, username {string}, scope {string}
 * @param result : callback to return token
 * @return notify whether operation was success or not
 */
const saveNewAccessToken = function (req, result) {
	// create new token
  const token = createToken(TokenLengthEnum.TOKEN);

	// save new token to db
  models.AccessTokens.create({
    tokenId: token,
    userId: req.username,
    applicationId: req.applicationId,
    expires: TokenExpirationEnum.TOKEN,
    scope: req.scope
  })
	// success
	.then(() => result(false, token))
	// error
	.catch((e) => {
  console.log(e);
  return result(true);
});
};

/**
 * Creates a new refresh token and returns the new generated token
 * @param req {Object} : Request object that has: applicationId {string}, username {string}, scope {string}
 * @param result : callback to return token
 * @return notify whether operation was success or not
 */
const saveNewRefreshToken = function (req, result) {
	// create new token
  const token = createToken(TokenLengthEnum.REFRESH_TOKEN);

	// save new token to db
  models.RefreshTokens.create({
    tokenId: token,
    userId: req.username,
    applicationId: req.applicationId,
    expires: TokenExpirationEnum.REFRESH_TOKEN,
    scope: req.scope
  })
	// success
	.then(() => result(false, token))
	// error
	.catch((e) => {
  console.log(e);
  return result(true);
});
};

/**
 * Validates that the access token exists in the db & has not expired
 * @param req {Object} - Request object that has: applicationId {string}, username {string}
 * @param result : callback to return object
 * @return notify whether operation was success or not
 */
const validateToken = function (req, result) {
  models.sequelize.query('SELECT [userId] FROM [AccessTokens]' +
	' WHERE [tokenId] = $token AND [applicationId] = $applicationId' +
	' AND [expires] > DATEADD(MINUTE, -$minutes, GETDATE())',
    {
      type: models.sequelize.QueryTypes.SELECT,
      bind: {
        token: req.token,
        applicationId: req.applicationId,
        minutes: 30
      }
    })
	// successful
	.then((response) => {
  console.log(response);
  if (response == null || response.length < 1) {
    return result(true);
  }

  return result(false, response[0]);
})
	// catch error
	.catch((e) => {
  console.log(e);
  return result(true);
});
};

/**
 * Validates that the refresh token exists in the db & has not expired
 * @param req {Object} - Request object that has: applicationId {string}, username {string}
 * @param result : callback to return object
 * @return notify whether operation was success or not
 */
const validateRefreshToken = function (req, result) {
	// SQL-ize query : finds user by refresh token & app id
  models.sequelize.query('SELECT [userId] FROM [RefreshTokens]' +
		' WHERE [tokenId] = $token AND [applicationId] = $applicationId' +
		' AND [expires] > DATEADD(MINUTE, -$minutes, GETDATE())',
    {
      type: models.sequelize.QueryTypes.SELECT,
      bind: {
        token: req.token,
        applicationId: req.applicationId,
        minutes: 30
      }
    })
	// successful
	.then((response) => {
  console.log(response);
  if (response == null || response.length < 1) {
    return result(true);
  }

  return result(false, response[0]);
})
	// catch error
	.catch((e) => {
  console.log(e);
  return result(true);
});
};

/**
 * Removes all access & refresh tokens that a user has connected to an application id
 * @param req {Object} - Request object that has: applicationId {string}, username {string}
 * @param callback
 * @return notify whether operation was success or not
 */
const removeAllTokens = function (req, callback) {
	// remove all access tokens connected to user by app id
  models.AccessTokens.destroy({
    where: {
      applicationId: req.applicationId,
      userId: req.username
    }
  })
	// catch error
	.catch((e) => {
  console.log(e);
  return callback(true);
});

	// remove all refresh tokens connected to user by app id
  models.RefreshTokens.destroy({
    where: {
      applicationId: req.applicationId,
      userId: req.username
    }
  })
	// catch error
	.catch((e) => {
  console.log(e);
  return callback(true);
});

	// success
  return callback();
};

const removeacessTokens = function (req, callback) {
	// remove all access tokens connected to user by app id
  models.AccessTokens.destroy({
    where: {
      applicationId: req.applicationId,
      userId: req.username
    }
  })
	// catch error
	.catch((e) => {
  console.log(e);
  return callback(true);
});

	
	// success
  return callback();
};

module.exports = {
  createToken,

  validateToken,

  validateRefreshToken,

  saveNewAccessToken,

  saveNewRefreshToken,

  removeAllTokens,
  removeacessTokens
};
