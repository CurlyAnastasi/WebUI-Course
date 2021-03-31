// Spiner left to right and back

const bouncing = _ => {
    console.clear();
    let space = ' ';
    _.count--;
    _.times++;

    // stop working
    if (_.count == 0) clearInterval(intervalId);

    // for 5 steps add empty spaces in the beginning and remove one from the end
    // and for next 5 steps do the opposite
    if (_.times <= 5) {
        console.log(`${_.bracketsStart}${space.repeat(_.times)}${_.symbol}${space.repeat(5 - _.times)}${_.bracketsEnd}`);
    } else {
        console.log(`${_.bracketsStart}${space.repeat(10 - _.times)}${_.symbol}${space.repeat(_.times-5)}${_.bracketsEnd}`);
    };

    // start from the beginning
    if (_.times == 10)  _.times = 0;
}

// let intervalId = setInterval(bouncing, 100, {symbol: '=', bracketsStart: '[', bracketsEnd:']', count: 100, times:0});
// let intervalId = setInterval(bouncing, 100, {symbol: '\u25CF', bracketsStart: '(', bracketsEnd:')', count: 100, times:0});

const arrowCircle = _ => {
    console.clear();
    _.counter--;

    // stop working
    if (_.counter == 0) clearInterval(intervalId);
    _.elNum++;
    _.elNum <= _.symbolArray.length-1 ? console.log(_.symbolArray[_.elNum]) : _.elNum = 0;
    
};

// let intervalId = setInterval(arrowCircle, 100, {counter:100, elNum:0, symbolArray: ['\u2197', '\u2192', '\u2198','\u2193','\u2199','\u2190','\u2196','\u2191']});
// let intervalId = setInterval(arrowCircle, 100, {counter:100, elNum:0, symbolArray: ['\u25D1','\u25D2','\u25D0','\u25D3']});

const grow = _ => {
    console.clear();
    _.counter--;

    // stop working
    if (_.counter == 0) clearInterval(intervalId);
    _.elNum++;

    _.elNum <= _.symbolArray.length - 1 ? console.log(_.symbolArray[_.elNum]) : _.elNum = 0;
    _.symbolArray.reverse();
};

// let intervalId = setInterval(grow, 1000, {counter:100, elNum:0, symbolArray: ['\u258F','\u258E','\u258D','\u2589','\u2588']});