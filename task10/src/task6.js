/* Task 6.
Input: length and value of min square. From 0 to 1000000.
Output: string with numbers which square is more than min.
 */

module.exports = function numericSequence(length, square) {
    let arr = [];
    let minValue = 1;
    let maxValue = 1000000;

    // Validation
        // Check that length and square are numbers
    if (!Number.isInteger(length) || !Number.isInteger(square) || length < minValue || length > maxValue || square < minValue || square > maxValue ) {
        return {status: 'failed', reason: `Values of length and min square must be integer numbers from 1 to 1000000`};
    };

    // Check every number from 1 and more and if its integer is more than square push to array
    for (let i = 1; i <= Infinity; i++) {
        if (i * i > square) arr.push(i);
        if (arr.length == length) break;
    };

    return arr.join(' ');
};


// console.log(numericSequence (10, 90));