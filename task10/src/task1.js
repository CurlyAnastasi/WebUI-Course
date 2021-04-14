/* Task 1.
Function which creates a chess boad with 3 params: length, width, symbol.
And returns a string with a chess board. Min length and width = 2; max = 256. */

module.exports = function createChessBoard(length, width, symbol) {
    const min = 2;
    const max = 256;
    let symbolsAmount = 0;
    let chessBoard = [];
    let oddLine = '';
    let evenLine = '';

    // Validation
    // check that all parameters exist
    if (!width || !length || !symbol) {
        return { status: 'failed', reason: instructions('Param is absent') };
    };
    //check that their length is more than min and less tham max
    if (length < min || length > max || width < min || width > max) {
        return { status: 'failed', reason: instructions('Uncorrect length') };
    };
    //check that symbol is string
    if (typeof symbol !== 'string') {
        return { status: 'failed', reason: instructions('Not a string') };
    };

    oddLine = `${symbol[0]} `;
    evenLine = ` ${symbol[0]}`;

    // Count needed amount of symbols
    symbolsAmount = Math.round(width / 2);

    // Create an odd and an even lines
    oddLine = oddLine.repeat(symbolsAmount);
    evenLine = evenLine.repeat(symbolsAmount);

    // Create chess board as an array
    for (let i = 1; i <= length; i++) {
        i % 2 == 0 ? chessBoard.push(evenLine) : chessBoard.push(oddLine);
    }

    // Return chess board as a string
    return chessBoard.join('\n');
}

function instructions(name) {
    switch (name) {
        case 'Param is absent': return 'There is not width, length or symbol value.';
        case 'Uncorrect length': return 'Unvalid params. Length and width must be more than 2 and less than 256';
        case 'Not a string': return 'Unvalid param. Symbol must be a string.';
    };
};



