'use strict';

var utils = require('./utils');

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] Path to be appended to the API BASE_PATH, joined with
 *  the instance's path (e.g. 'portraits')
 * @param [spec.required=[]] Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  (preceeding the also-optional callback argument
 */
function figureMethod(spec) {

  var commandPath = typeof spec.path == 'function' ? spec.path
                  : utils.makeURLInterpolator(spec.path || '');
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];
  var urlData = {};

  return function() {
    
    var self = this;
    var args = [].slice.call(arguments);

    var callback = typeof args[args.length - 1] == 'function' && args.pop();
    var deferred = self.createDeferred(callback);

    for (var i = 0, l = urlParams.length; i < l; ++i) {

      var arg = args[0];
      var param = urlParams[i];

      if (!arg) {
        var err = new Error(
          'Figure: Argument "' + urlParams[i] + '" required, but got: "' + arg + 
          ' (on API request to ' + requestMethod + ' ' + commandPath + ')'
        );
        deferred.reject(err);
        return deferred.promise;
      }

      urlData[param] = args.shift();
    }

    var requestPath = this.createFullPath(commandPath, urlData);

    var options = {};
    if (args.length > 0) {
      if (utils.isObject(args[0])) {
        options = args.shift();
      }
    }

    if (args.length) {
      var err = new Error(
        'Figure: Unknown arguments (' + args + ').'
      );
      deferred.reject(err);
      return deferred.promise;
    }

    function requestCallback(err, response) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(response);
      }
    };

    self._request(requestMethod, requestPath, options.data, options.query, options.headers, requestCallback);

    return deferred.promise;
  }
}

module.exports = figureMethod;