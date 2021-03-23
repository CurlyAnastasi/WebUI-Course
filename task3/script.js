const fruit = ['Банан', 'Яблоко', 'Ананас'];

//// Reduce() instead if map()
console.log(fruit.reduce((acc, el) => {
    return acc.concat(el[0]);
}, []));

//// Reduce() instead of filter()
console.log(fruit.reduce((acc, el) => {
    return el[0].toLowerCase() == 'а' ? acc.concat(el) : acc;
}, []));

//// Reduce() instead of forEach()
console.log(fruit.reduce((acc, el, i, arr) => {
    arr[i] = `${i + 1}: ${el};`;
}));


//// Unshift()
function unshift(arr, ...args) {
    if (Array.isArray(arr)) {
        arr.splice(0, 0, ...args);
        return arr.length;
    } else {
        console.error('not an array');
    }
}

// console.log(unshift(fruit,'Груша', 'Слива'));

//// Pop ()
function pop(arr) {
    return Array.isArray(arr) ? arr.splice(-1).join() : console.error('not an array');
}

// console.log(`Pop() \nDeleted element: ${pop(fruit)}; array:${fruit}`);

//// Shift()
function shift(arr) {
    return Array.isArray(arr) ? arr.splice(0, 1).join() : console.error('not an array');
}

// console.log(`Shift() \nDeleted element: ${shift(fruit)}; array:${fruit} `);

//// Push()
function push(arr, ...args) {
    if (Array.isArray(arr)) {
        arr.splice(arr.length, 0, ...args);
        return arr.length;
    } else {
        console.error('not an array');
    }
}

console.log(push(fruit, 'Груша', 'Слива', 2));


//// Concat()
function concat(...args) {
    let arr = [];
    args.forEach(el => Array.isArray(el) ? arr.push(...el) : arr.push(el));
    return arr;
}

// console.log(concat([1,2,3], ['a','b','c'], 3));

