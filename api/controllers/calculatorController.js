'use strict';

exports.get_calculus = function (req, res) {
  var input = req.query.query;
  var main = require('../main');

  main.doCalculus(input, function(err, output){
    if(err){
      return res.json({'error' : true, 'message' : 'An error has occurred'});
    }
    res.json({ 'error': false, 'result': output });
  });

};
