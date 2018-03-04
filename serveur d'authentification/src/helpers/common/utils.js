exports.setStatus = function (err) {
  let result = 400;
  if (err.code < 1000 && err.code != 13) {
    console.log(`Server Error: ${JSON.stringify(err)}`);
    result = 500;
  } else if (err.code == 13) {
    result = 404;
  } else if (typeof err.status !== 'undefined') {
    result = err.status;
  }
  return result;
};

exports.extractResponse = function (response) {
  return response;
};

exports.extractError = function (error) {
  console.log(error);
  throw error;
};

exports.formatJSONResponse = function (response) {
  return JSON.stringify(response || {}, null, 2);
};

exports.formatJSONError = function (err) {
  return JSON.stringify(err || {}, null, 2);
};

exports.formatError = function (error) {
  console.log(error);
  return error.code;
};

exports.logError = function (error) {
    // console.log(error);
};

/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */
exports.uid = function (len) {
  let buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;

  for (let i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.nbalea = function(len) {
  let buf = [];
  for (let i = 0; i < len; ++i) {
    buf.push(getRandomInt(0, 9));
  } 
  return buf.join(''); 
};





