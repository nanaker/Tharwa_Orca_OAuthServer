/* jshint node: true */


//
// The configuration options of the server
//

/**
 * Configuration of access tokens.
 *
 * expiresIn - The time in seconds before the access token expires
 * calculateExpirationDate - A simple function to calculate the absolute
 * time that th token is going to expire in.
 * authorizationCodeLength - The length of the authorization code
 * accessTokenLength - The length of the access token
 * refreshTokenLength - The length of the refresh token
 * passwordTokenLength - The length of the password token
 */
const token = {
  expiresIn: 3600,
  expiresIn2: 3600*24,
  calculateExpirationDate() {
    return new Date(new Date().getTime() + (this.expiresIn * 1000));
  },
  calculateRefreshExpirationDate() {
    // 1 journee
    
    return new Date(new Date().getTime() + (this.expiresIn2 * 1000));
  },
  authorizationCodeLength: 16,
  accessTokenLength: 255,
  refreshTokenLength: 255,
  passwordTokenLength: 255
};

/**
 * Database configuration for access and refresh tokens.
 *
 * userName -
 * password -
 * server -
 * domain -
 * options -
 * database -
 * instanceName -
 */
const dbConnString = {
  userName: 'tharwa',
  password: 'orca@2018',
  server: 'den1.mssql6.gear.host',
  options: {
    database: 'THARWA',
    encrypt: 'true'
  }
};

/* XSS configuration */
const xssConfig = {
  stripIgnoreTag: true
};

const MAIL_CONFIG = {
  FROM: process.env.MAIL_FROM,
  URL: process.env.MAIL_URL,
  TYPE: process.env.MAIL_TYPE
};

/* SENDGRID configuration */
const SENDGRID_CONFIG = {
  API_KEY: process.env.SENDGRID_KEY
};

/* PASSWORD configuration */
const SALT_KEY = process.env.SALT_KEY;

module.exports = {
  MAIL_CONFIG,
  SENDGRID_CONFIG,
  SALT_KEY,
  token,
  xssConfig,
  dbConnString
};
