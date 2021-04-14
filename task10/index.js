const http = require('http');
const url = require('url');
const createChessBoard = require('./src/task1');
const analyseEnvelopes = require('./src/task2');
const findPalindrome = require('./src/task4');
const findLuckyTickets = require('./src/task5');
const numericSequence = require('./src/task6');
const sortFibonacciNum = require('./src/task7');
let result;

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h3>Result:</h3>`);
    // get the task number
    const query = url.parse(req.url, true).query;
    const { task } = query;
    // display result of the task
    if (task == 1) {
        const { length, width, symbol } = query;
        result = createChessBoard(+length, +width, symbol);
        res.write(`<pre>${result}</pre>`);
    } else if (task == 2) {
        let { a, b, c, d } = query;
        [a, b, c, d] = [+a, +b, +c, +d];
        result = analyseEnvelopes({ a, b }, { c, d });
        res.write(JSON.stringify(result));
    } else if (task == 4) {
        const { number } = query;
        result = findPalindrome(+number);
        res.write(`${result}`);
    } else if (task == 5) {
        const { min, max } = query;
        result = findLuckyTickets({ min: Number(min), max: Number(max) });
        res.write(JSON.stringify(result));
    } else if (task == 6) {
        const { length, square } = query;
        result = numericSequence(+length, +square);
        res.write(result);
    } else if (task == 7) {
        const { min, max, length } = query;
        result = sortFibonacciNum(length == undefined ? { min: Number(min), max: Number(max) } : { length: Number(length) });
        res.write(JSON.stringify(result));
    }
    else {
        res.write(`Put the correct data`);
    }

    res.end()
}).listen(8000);

console.log('Error on http://localhost:8000');
console.log('Task 1 on http://localhost:8000/?task=1&length=60&width=60&symbol=*');
console.log('Task 2 on http://localhost:8000/?task=2&a=2&b=4&c=3&d=6');
console.log('Task 4 on http://localhost:8000/?task=4&number=5445');
console.log('Task 5 on http://localhost:8000/?task=5&min=2&max=555555');
console.log('Task 6 on http://localhost:8000/?task=6&length=10&square=90');
console.log('Task 7 on http://localhost:8000/?task=7&min=10&max=90');
console.log('Task 7 on http://localhost:8000/?task=7&length=10');
