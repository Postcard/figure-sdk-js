'use strict';

Figure.DEFAULT_HOST = 'api.figure.co';
Figure.DEFAULT_PROTOCOL = 'https';
Figure.DEFAULT_TIMEOUT = 60000; // 1 min

var resources = {
  Portraits: require('./resources/Portraits.js')
};

Figure.resources = resources;


function Figure(options){

  var opts = typeof options === 'object' ? options : {};

  if (!(this instanceof Figure)) {
    return new Figure(opts);
  }

  this._api = {
    host: opts.host || Figure.DEFAULT_HOST,
    protocol: opts.protocol || Figure.DEFAULT_PROTOCOL,
    basePath: opts.basePath || '',
    timeout: opts.timeout || Figure.DEFAULT_TIMEOUT
  }

  this._prepResources();

}

Figure.prototype = {

  setBasePath: function(basePath) {
    this._setApiField(
      'basePath',
      basePath);
  },

  setHost: function(host, protocol) {
    this._setApiField('host', host);
    if (protocol) {
      this.setProtocol(protocol);
    }
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol);
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Figure.DEFAULT_TIMEOUT : timeout
    );
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  _prepResources: function() {
    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  },

}

module.exports = Figure;
