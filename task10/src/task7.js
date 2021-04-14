/* Task 7.
Input: {min:number, max:number / length: number};
Output: [Fibonacci numbers from min to max or with correct length]
 */

module.exports = function sortFibonacciNum (context) {

    let result = [1,1];

    // Validation
    
    // Check that argument is an object and not an array
    if (typeof context !== 'object' || Array.isArray(context)) {
        return {status: 'failed', reason: instructions('Not an object')};
    };
    // Check that there are two keys inside object: min and max or length 
    if (!context.hasOwnProperty('min') || !context.hasOwnProperty('max')) {
        if (!context.hasOwnProperty('length')) {
            return {status: 'failed', reason: instructions('Key is absent')};
        };
    };

    // Check that values are integers
    if (context.hasOwnProperty('min')) {
        if (!Number.isInteger(context.min) || !Number.isInteger(context.max) || context.min < 0 || context.max < 0 || context.min > context.max) {
            return {status: 'failed', reason: instructions('Not a number')};
        };

    };
    if (context.hasOwnProperty('length')) {
        if (!Number.isInteger(context.length) || context.length <= 0) {
            return {status: 'failed', reason: instructions('Uncorrect length value')};
        };
    };
    
    // Show the Fibonacci numbers from min to max or according to length param
    for (let i = 0; i < context.max || i < context.length; i++ ) {
        let sum = result[result.length - 1] + result[result.length - 2];
        if(context.hasOwnProperty('min')) {
            if (sum >= context.max)  break;
        }else {
            if (result.length == context.length) break;
        };
        result.push(sum);
    };
    
    return context.hasOwnProperty('min') ?  result.filter(el => el >= context.min) : result;
};

function instructions(name) {
    switch (name) {
        case 'Not an object': return 'Unvalid type of params. Should be an object';
        case 'Key is absent': return 'There is no such key in object as min and max or length';
        case 'Not a number': return 'Values of min and max must be integer numbers and min less than max';
        case 'Uncorrect length value': return 'Values of length must be integer number more than 0';
    };
};


// console.log(sortFibonacciNum({length: 0}));
// console.log(sortFibonacciNum({ max:100, length:10}));