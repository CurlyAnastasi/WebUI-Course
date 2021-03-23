// concat()
function concat(...args) {
    return args.join(' ');
}

console.log(concat('Hello','team','!',3,4));

// lastIndexOf()
function lastIndexOf(str, letter, startIndex=str.length-1) {
    for (let i = startIndex; i>=0; i--) {
        if (!str.includes(letter)) {
            return -1;
        }else if (str[i] === letter) {
            return i;
        } 
    }
}

console.log(lastIndexOf('Hello world','o',6));

// includes()
function includes(str, word, startIndex = 0) {
    return str.indexOf(word,startIndex) !== -1 ? true : false;
}

console.log(includes('Hello world', 'o',8));

// repeat()
function repeat(str,times) {
    let repeatStr = '';
    if (times > 0) {
        for (let i = 0; i < times; i++) {
            repeatStr += str;
        }
    }
    return repeatStr;
}

console.log(repeat('hello',5));

// substring()
function substring(str, start, end) {
    return end < start ? str.slice(end, start) : str.slice(start, end);
}

console.log(substring("hello world",2,5));

