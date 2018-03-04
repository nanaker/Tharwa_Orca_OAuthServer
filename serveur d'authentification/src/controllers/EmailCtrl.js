

const async = require('async');
const _ = require('lodash');
const sendgrid = require('../helpers/common/sendgrid');

const validateField = function (field, fieldName, next) {
  if (_.isNull(field) || _.isNaN(field) || _.isUndefined(field)) {
    const err = new Error('FIELD_EMPTY');
    err.message = `Field "${fieldName}" empty`;
    return next(err);
  }

  return next();
};

const sendEmail = function (req, next) {
  async.parallel({
    evalTo(callback) {
      return validateField(req.to, 'to', callback);
    },
    evalFrom(callback) {
      return validateField(req.from, 'from', callback);
    },
    evalSubject(callback) {
      return validateField(req.subject, 'subject', callback);
    },
    evalContent(callback) {
      return validateField(req.content, 'content', callback);
    },
    sendMail(callback) {
      return sendgrid.sendMail(
        {
          to: req.to,
          from: req.from,
          subject: req.subject,
          content: req.content,
          type: req.contentType || 'text/plain'
        },
					callback);
    }
  }, (err) => {
    if (err) {
      return next(err);
    }
    return next();
  }
	);
};

module.exports = {
  sendEmail
};
