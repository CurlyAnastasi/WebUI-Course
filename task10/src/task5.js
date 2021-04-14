/* Task 5.
Function analyses two ways of counting lucky tickets
and returns one with the most amount of them.
Simle way: sum of three first numbers = sum of three last numbers.
Hard way: sum of even numbers = sum of odd numbers;
Input: {min:num, max:num};
Output: {winer:simple/hard, simle:amount, hard:amount}.
*/

module.exports = function findLuckyTickets (context) {
    let min = context.min;
    let max = context.max;
    let sum1 = 0;
    let sum2 = 0;
    let evenSum = 0;
    let oddSum = 0;
    let result = {
        winner: '',
        simpleWay: 0,
        hardWay: 0
    };
 
    // Validation
        // Check that argument is an object and not an array
    if (typeof context !== 'object' || Array.isArray(context)) {
        return {status: 'failed', reason: instructions('Not an object')};
    };
        // Check that there are two keys inside object: min and max
    if (!context.hasOwnProperty('min') || !context.hasOwnProperty('max')) {
        return {status: 'failed', reason: instructions('Key is absent')};
    };
        // Check that values are integers
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        return {status: 'failed', reason: instructions('Not an integer')};
    };
        // Check that values are between 0 and 999999 and min less than max
    if (min < 0 || max < 0 || min > 999999 || max > 999999 || min > max) {
        return {status: 'failed', reason: instructions('Unvalid value') };
    };

    for (let num = min; num <= max; num++) {
        // Rewrite num's value to six symbols
        num = '0'.repeat(6 - String(num).length) + num;
    
        // SIMPLE WAY
            // Count the sum of first three numbers and second three
        sum1 = num.slice(0,3).split('').reduce((acc, el) => Number(acc) + Number(el));
        sum2 = num.slice(3,6).split('').reduce((acc, el) => Number(acc) + Number(el));
        
            // Compare sums and count lucky tickets
        if (sum1 == sum2) result.simpleWay +=1;

        // HARD WAY
            // Count the sum of even numbers and odd
        evenSum = num.split('').filter(el => el%2 == 0);
        evenSum = evenSum.length !== 0 ? evenSum.reduce((a,b)=> Number(a) + Number(b)) : 0;
        oddSum = num.split('').filter(el => el%2);
        oddSum = oddSum.length !== 0 ? oddSum.reduce((a,b)=> Number(a) + Number(b)) : 0;
            // Compare sums and count lucky tickets
        if (evenSum == oddSum) result.hardWay += 1;
        
        // Define the winner
        if (result.simpleWay == 0 && result.hardWay == 0) {
            result.winner = 'no winner';
        } else {
            result.winner = result.simpleWay > result.hardWay ? 'simple way' : 'hard way';
        };
    };
    
    return result;
};

function instructions(name) {
    switch (name) {
        case 'Not an object': return 'Unvalid type of params. Should be an object';
        case 'Key is absent': return 'There is no such key in object as min or max';
        case 'Not an integer': return 'Values of min and max must be integer numbers';
        case 'Unvalid value': return 'Values of min and max must be from 0 to 999999 and min less than max';
    };
};
// console.log(findLuckyTickets({min:123456,max:999999}));
// console.log(findLuckyTickets({min:2,max:5}));
// console.log(findLuckyTickets({min:2,max:555555}));