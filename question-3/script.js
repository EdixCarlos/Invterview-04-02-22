/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node scritp.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`)

/**
 * Check if a string has correct use of parenthesis.
 * 
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(str) {
  // TODO: Implement validation logic
  // While the string contains a pair of brackets
  // Initialise an array to store the closing brackets expected
  const array = [];
  const open = {
    '{': '}',
    '[': ']',
    '(': ')'
  };
  const closed = {
    '}': true,
    ']': true,
    ')': true
  }
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    
    if (open[char]) {
      array.push(char);
    } else if (closed[char]) {
      if (open[array.pop()] !== char){
      	return false;
      }
    }
  }
  return array.length === 0;  
}
const isValid = parenthesisChecker(args.toString());
console.log(`parenthesisChecker("${args}") = ${isValid}`);

