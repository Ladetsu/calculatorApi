var exports = module.exports = {};

/**
 * Implementation of the Shunting Yard algorithm.
 * It transforms the given input (Infix notation) 
 * to Polish Reverse Notation (Postfix notation),
 * and returns that.
 * 
 * @param infix 
 */
exports.fromInfixToPostfix = (infix) => {
  let postfix = "";
  let foundOperators = [];

  const operators = {
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

  //Preparing the infixArray
  infix = infix.replace(/\s+/g, "");
  let infixArray = infix.split(/([\+\-\*\/\(\)])/).clean();

  for (let token of infixArray) {
    //if the token is a number, push it to the postfix queue
    if (token.isNumeric()) {
      postfix += token + " ";
    } else if ('+-*/'.includes(token)) {
      let operator1 = token;
      let operator2 = foundOperators[foundOperators.length - 1];
      //While there is an operator at the top of the operator stack with greater presence OR
      //the operator at the top of the operator stack has equal precedence and the operator is left associative AND
      // the operator at the top of the stack is not a left bracket
      while ("*/+-".includes(operator2)
        && ((operators[operator1].associativity === "Left"
          && operators[operator1].precedence <= operators[operator2].precedence)
          || (operators[operator1].associativity === "Right"
            && operators[operator1].precedence < operators[operator2].precedence))) {
        postfix += foundOperators.pop() + " ";
        operator2 = foundOperators[foundOperators.length - 1];
      }
      foundOperators.push(operator1);
    } else if (token === '(') {
      foundOperators.push(token);
    } else if (token === ')') {
      //pop operators from the operator stack to postfix queue until left bracket is found
      while (foundOperators[foundOperators.length - 1] !== '(') {
        postfix += foundOperators.pop() + " ";
      }
      foundOperators.pop();
    }
  }

  //Adding any operators left on the foundOperators array to postfix string.
  while (foundOperators.length > 0) {
    postfix += foundOperators.pop() + " ";
  }

  return postfix;
};

/**
 * Function to solve the Postfix notation, a.k.a Polish Reverse notation.
 * 
 * If the given postfix is not valid, an error is thrown.
 * Otherwise 
 * 
 * @param postfix 
 */
exports.solvePostfix = (postfix) => {
  let postFixArray = postfix.split(" ").clean();
  let tokenStack = [];

  for (let token of postFixArray) {
    if (token.isNumeric()) {
      tokenStack.push(token);
    } else {
      let operand2 = tokenStack.pop();
      let operand1 = tokenStack.pop();

      //Checking that the operands and the operator are valid for calculating the result.
      if (operand1 === undefined || operand2 === undefined || !"*/+-".includes(token)) {
        throw new Error("Given input was invalid: " + postfix);
      }

      if (token === '+') {
        tokenStack.push(parseFloat(operand1) + parseFloat(operand2));
      } else if (token === '-') {
        tokenStack.push(parseFloat(operand1) - parseFloat(operand2));
      } else if (token === '/') {
        tokenStack.push(parseFloat(operand1) / parseFloat(operand2));
      } else if (token === '*') {
        tokenStack.push(parseFloat(operand1) * parseFloat(operand2));
      }
    }
  }

  //If there are more than one token on tokenstack, error should be thrown.
  if (tokenStack.length != 1) {
    throw new Error("Given input was invalid: " + postfix);
  }

  return tokenStack.pop();
};

/**
 * Helper function, clears the given array from any empty values.
 */
Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};

/**
 * Helper function, checks if the given value is numeric or not.
 */
String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
};
