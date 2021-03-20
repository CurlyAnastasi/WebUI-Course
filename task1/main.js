// Task 1

function bitsNum(num) {
    return Number.isInteger(num) ?
        num.toString(2).split('').filter(el => el == 1).length
        : 'not an integer';

}

console.log('Task 1 result:', bitsNum(1234));

// Task 2

function sortStr(str) {
    return str.split(' ').sort((a, b) => a.match(/\d/) - b.match(/\d/)).join(' ');
}

console.log('Task 2 result:', sortStr("4of Fo1r pe6ople g3ood th5e the2"));

// Task 3

function remainOfFootballers(cards) {
    let teamA = 11;
    let teamB = 11;
    // remove all players with red cards
    cards.forEach(el => {
        if (el.includes('R') && el.includes('A')) { teamA -= 1; }
        else if (el.includes('R') && el.includes('B')) { teamB -= 1; };
    });
    // remove all players with 2 and more yellow cards
    cards.filter((item, index) => cards.indexOf(item) !== index)
        .forEach(el => {
            if (el.includes('Y') && el.includes('A')) { teamA -= 1 }
            else if (el.includes('Y') && el.includes('B')) { teamB -= 1 };
        });

    return `Task 3 result: [${teamA},${teamB}]`;
}

console.log(remainOfFootballers(["A4R", "A6R", "A8R", "A10R", "A11R"]));