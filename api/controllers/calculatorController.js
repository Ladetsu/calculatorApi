'use strict';

exports.get_calculus = function (req, res) {
  let input = req.query.query;
  let main = require('../main');

  main.doCalculus(input, function(err, output){
    if(err){
      return res.json({'error' : true, 'message' : err.message});
    }
    res.json({ 'error': false, 'result': output });
  });

};
