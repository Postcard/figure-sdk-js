'use strict';

var FigureResource = require('../FigureResource');
var figureMethod = FigureResource.method;

module.exports = FigureResource.extend({

  path: 'portraits',
  includeBasic: [
    'get', 'edit'
  ],

  getAllPublic: figureMethod({
    method: 'GET',
    path: '/public'
  }),

  shareByEmail: figureMethod({
    method: 'POST',
    path: '/{public_code}/share_by_email',
    urlParams: ['public_code']
  })

});