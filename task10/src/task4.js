/* Task 4.
Function checks is the number or its part a palindrome.
Input: number. Length > 10.
Output: palindrome or 0.
*/

module.exports =  function findPalindrome (number) {
    let variants = [];
    let palindromes = [];
    let maxLength = 20;

    // Validation

    // Check that argument is a number and its length is more than 2 and less than 20
    if (!Number.isInteger(number) || number < 10 || String(number).length > maxLength) {
        return {status: 'failed', reason: 'Unvalid type of params. Should be a number. Length more that 2, but less than 20'};
    }
    // Create an array of all possible variants
    number = String(number);

    for (let a = 0; a <= number.length; a++) {
        for (let b = 2; b <= number.length; b++) {
            if (number.slice(a, b) > 10) variants.push(number.slice(a, b));
        }
    };
    
    // Compare every value with its reversed value and create an array of palindromes
    palindromes = variants.filter(el => el == el.split('').reverse().join(''));
    
    // Return the longest palindrome or zero if there are no palindromes
    return palindromes.length == 0 ? 0 : + palindromes.sort((a,b) => b - a)[0];
};


// console.log(findPalindrome(445544321234));
// console.log(findPalindrome(11123454));