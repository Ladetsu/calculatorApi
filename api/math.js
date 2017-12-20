var exports = module.exports = {};

exports.solvePostFix = (postFix) =>{
  let postFixArray = postFix.split(" ").clean();
  let tokenStack = [];
  for(var i=0; i<postFixArray.length; i++){
    var token = postFixArray[i];
    if(token.isNumeric()){
      tokenStack.push(token);
    }else{
      var operand_2 = tokenStack.pop();
      var operand_1 = tokenStack.pop();
      if(token === '+'){
        tokenStack.push(parseFloat(operand_1) + parseFloat(operand_2));
      }else if(token === '-'){
        tokenStack.push(parseFloat(operand_1) - parseFloat(operand_2));
      }else if(token === '/'){
        tokenStack.push(parseFloat(operand_1) / parseFloat(operand_2));
      }else if(token === '*'){
        tokenStack.push(parseFloat(operand_1) * parseFloat(operand_2));
      }
    }
  }
  if(tokenStack.length > 1){
    throw new Error;
  }else {
    //return tokenStack.pop();
    throw new Error;
  }
};
