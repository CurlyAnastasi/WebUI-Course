/* Task 1.
Function checks is the board's current state solved or not.
Input: 3x3 array, where the value is 0 if spot is empty,
1 if it is an 'X', or 2 if it is an 'O',
Output: -1 if the board is not yet finished (there are empty spots),
1 if 'X' won,
2 if 'O' won,
0 if is's a cat's game
*/

function ticTakToeChecker(arr) {

    // Validation
    if (!Array.isArray(arr) || arr.length != 3 || !(arr.every(el => el.length == 3))) return 'Unvalid params';
    for (let el of arr) {
        for (i of el) {
            if (i < 0 || i > 2 || typeof i !== 'number') return 'Unvalid params';
        }
    }

    // Check simillar numbers in a row
    for (let row of arr) {
        if (row.every(el => el == 1)) return 1;
        else if (row.every(el => el == 2)) return 2;
    }

    // Check other possible variants 
    if (arr.every(el => el[0] == 1)) return 1;
    else if (arr.every(el => el[1] == 1)) return 1;
    else if (arr.every(el => el[2] == 1)) return 1;
    else if (arr.every(el => el[0] == 2)) return 2;
    else if (arr.every(el => el[1] == 2)) return 2;
    else if (arr.every(el => el[2] == 2)) return 2;
    else if (arr[0][0] == 1 && arr[1][1] == 1 && arr[2][2] == 1) return 1;
    else if (arr[0][2] == 1 && arr[1][1] == 1 && arr[2][0] == 1) return 1;
    else if (arr[0][0] == 2 && arr[1][1] == 2 && arr[2][2] == 2) return 2;
    else if (arr[0][2] == 2 && arr[1][1] == 2 && arr[2][0] == 2) return 2;

    // Check if row includes empty spaces or is it a cat's game
    return arr.map(el => el.includes(0)).includes(true) ? -1 : 0;
};

// console.log(ticTakToeChecker([[2,1,1],[1,2,2],[2,1,2]]));


// Task 2

function messageChecker (message, hideMessage) {
    // Get the length of word in first sentence
    let wordNumbers = message[0].split(' ').map(word => word.length);
    let length = wordNumbers.length;

    // Remove first sentence
    message.shift(0);

    // Take a needed word from a sentence
    let secretWords = '';
    for (let i = 0; i < wordNumbers.length; i++) {
        secretWords += `${message[i].split(' ')[wordNumbers[i] - 1]} `;
    };

    // First letter in a sentence to upperCase and add dot
    secretWords = secretWords[0].toUpperCase() + secretWords.slice(1).toLowerCase() +'.';
    hideMessage.push(secretWords);

    // Remove sentences from which we already taken words
    message.splice(0,length);
    wordNumbers.splice(0,length);

    return message, hideMessage;
}

function findHiddenMessage(string) {
    // Create an array of sentences and remove all commas
    let message = string.split('. ').map(sentence => sentence.replace(/[.,-]/g, '').replace(/"/g, ''));
    let hideMessage = [];

    // Get hide message
    message, hideMessage = messageChecker(message, hideMessage);

    // If there are sentences in a message, repeat action. Otherwise, return hideMessage
    message.length == 0 ? hideMessage : messageChecker(message, hideMessage);
    return hideMessage.join(' ');
}

// console.log(findHiddenMessage('Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "mission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.'));