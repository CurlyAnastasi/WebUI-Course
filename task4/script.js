// Task 1 - MEETING
const s = "Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill";

function meeting(list) {
    if (typeof list === 'string') {
        list = list.toUpperCase().split(';').map(el => el.split(':').reverse()).sort();
        return list.map(el => `(${el.join(', ')})`).join(' ');
    } else {
        console.error('Unvalid argument');
    }
};

// console.log(meeting(s));

// Task 2 - FIND A CHAIR

function findChair(arr, need) {
    if (need == 0) return 'Game On';

    let freeChairs = arr.map(el => {
        const free = el[1] - el[0].length;
        return free >= 0 ? free : 0;
    });

    let array = [];
    freeChairs.reduce((acc, el) => {
        if (acc < need) {
            array.push(el);
            return acc + el;
        } else {
            return acc;
        };
    }, 0);
    return array.reduce((acc, el) => acc + el) < need ? 'Not enough!' : array;

};

// console.log(findChair([['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9]], 5));
// console.log(findChair([ ['XXX', 1], ['XXXXXX', 6], ['X', 2], ['XXXXXX', 8], ['X', 3], ['XXX', 1]], 5));
// console.log(findChair([ ['XX', 2], ['XXXX', 6], ['XXXXX'], 5], 0));

// Task 3 

function findTheClosest(arr) {
    let minDist = Infinity;
    let closestPair;

    for (let a = 0; a < arr.length; a++) {

        for (let b = a + 1; b < arr.length; b++) {
            let dist = Math.abs(arr[a][0] - arr[b][0]) + Math.abs(arr[a][1] - arr[b][1]);
            if (minDist > dist) {
                minDist = dist;
                closestPair = [arr[a], arr[b]];
            };
        }

    }

    return closestPair;
};

// console.log(findTheClosest([ [2,2], [2,8], [5,5], [6,3], [6,7], [7,4], [7,9] ]));