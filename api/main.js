let math = require('./math');

exports.doCalculus = function (input, callBack) {
  let response = "";
  try {
    let decodedInput = Buffer.from(input, 'base64').toString('utf8');
    let postfix = math.fromInfixToPostfix(decodedInput);
    response = math.solvePostfix(postfix);
  } catch (err) {
    return callBack(err);
  }
  callBack(null, response);
};