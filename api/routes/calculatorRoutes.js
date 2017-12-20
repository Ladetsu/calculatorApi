'use strict';

module.exports = function(app){
  var calculator = require('../controllers/calculatorController');

  app.route('/calculus')
    .get(calculator.get_calculus);

  };
