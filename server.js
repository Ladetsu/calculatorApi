var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

var routes = require('./api/routes/calculatorRoutes');
routes(app);

app.listen(port);

console.log('calculator RESTful API server started on: ' + port);
