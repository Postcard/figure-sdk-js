'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by figure-sdk-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Figure's REST API)
 */
var FigureError = _Error.FigureError = _Error.extend({
  type: 'figure_error',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;
    this.stack = (new Error(raw.message)).stack;
    this.status = raw.status;
    this.message = raw.message;
    this.text = raw.text;
    this.raw = raw;
  },
});

/**
 * Helper factory which takes raw figure errors and outputs wrapping instances
 */
FigureError.generate = function(rawFigureError) {
	switch(rawFigureError.status) {
		case 400:
			return new _Error.FigureBadRequestError(rawFigureError)
		case 401:
			return new _Error.FigureAuthenticationError(rawFigureError)
		case 403:
			return new _Error.FigureAuthorizationError(rawFigureError)
		case 404:
			return new _Error.FigureNotFoundError(rawFigureError)
		case 429:
			return new _Error.FigureRateLimitError(rawFigureError)
		case 500:
			return new _Error.FigureInternalServerError(rawFigureError)
		case 502:
			return new _Error.FigureConnectionError(rawFigureError)
		case 503:
			return new _Error.FigureConnectionError(rawFigureError)
	}
  return new _Error('Generic', 'Unknown Error');
};

// Specific Figure Error types:
_Error.FigureBadRequestError = FigureError.extend({type: 'bad_request_error'});
_Error.FigureAuthenticationError = FigureError.extend({type: 'authentication_error'});
_Error.FigureAuthorizationError = FigureError.extend({type: 'authorization_error'});
_Error.FigureNotFoundError = FigureError.extend({type: 'not_found_error'});
_Error.FigureRateLimitError = FigureError.extend({type: 'rate_limit_error'});
_Error.FigureInternalServerError = FigureError.extend({type: 'internal_server_error'});
_Error.FigureConnectionError = FigureError.extend({type: 'connection_error'});
_Error.FigureNotAvailableYetError = FigureError.extend({type: 'not_available_yet_error'});