var math = require('./math');

exports.doCalculus = function (input, callBack){
  var response = "";
  try{
    var decodedInput = Buffer.from(input, 'base64').toString('utf8');
    var postFix = fromInFixToPostFix(decodedInput);
    response = math.solvePostFix(postFix);
  }catch(err){
    return callBack(err);
  }
  callBack(null, response);
};

function fromInFixToPostFix(infix){
  var output = "";
  var foundOperators = [];

  const operators = {
    "^": {
        precedence: 4,
        associativity: "Right"
    },
    "/": {
        precedence: 3,
        associativity: "Left"
    },
    "*": {
        precedence: 3,
        associativity: "Left"
    },
    "+": {
        precedence: 2,
        associativity: "Left"
    },
    "-": {
        precedence: 2,
        associativity: "Left"
    }
  }

  infix = infix.replace(/\s+/g, "");
  var inputArray = infix.split(/([\+\-\*\/\(\)])/);
  inputArray.clean();
  for(var i=0; i<inputArray.length; i++){
    var token = inputArray[i];
    if(token.isNumeric()){
      output += token + " ";
    }else if('+-*/'.includes(token)){
      var o1 = token;
      var o2 = foundOperators[foundOperators.length - 1];
      while("^*/+-".includes(o2)
            && ((operators[o1].associativity === "Left"
            && operators[o1].precedence <= operators[o2].precedence)
            || (operators[o1].associativity === "Right"
            && operators[o1].precedence < operators[o2].precedence))) {
                    output += foundOperators.pop() + " ";
                    o2 = foundOperators[foundOperators.length - 1];
                }
                foundOperators.push(o1);
    }else if(token === '('){
      foundOperators.push(token);
    }else if(token === ')'){
      while(foundOperators[foundOperators.length - 1] !== '('){
        output += foundOperators.pop() + " ";
      }
      foundOperators.pop();
    }
  }

  while(foundOperators.length > 0){
    output += foundOperators.pop() + " ";
  }

  return output;
};

Array.prototype.clean = function() {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};

String.prototype.isNumeric = function() {
    return !isNaN(parseFloat(this)) && isFinite(this);
};
