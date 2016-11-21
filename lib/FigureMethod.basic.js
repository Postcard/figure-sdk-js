'use strict';

var figureMethod = require('./FigureMethod');
var utils = require('./utils');

module.exports = {

  create: figureMethod({
    method: 'POST',
  }),

  getAll: figureMethod({
    method: 'GET',
  }),

  get: figureMethod({
    method: 'GET',
    path: '/{id}',
    urlParams: ['id'],
  }),

  edit: figureMethod({
    method: 'PUT',
    path: '/{id}',
    urlParams: ['id'],
  }),

  // Avoid 'delete' keyword in JS
  del: figureMethod({
    method: 'DELETE',
    path: '/{id}',
    urlParams: ['id'],
  })

}