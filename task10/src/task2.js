/* Task 2.
Function which analyse can one envelop be put in another.
Input: two objects with sides of envelopes.
Output: number of envelope in which we can put another or 0 if it is unpossible.
 */

module.exports =  function analyseEnvelopes (env1, env2) {
    let minValue = 1;
    let maxValue = 1000000;

    // Validation
    // Check that params are objects
    if (typeof env1 !== 'object' || Array.isArray(env1) || typeof env2 !== 'object' || Array.isArray(env2)) {
        return {status: 'failed', reason: instructions('Not an object')};
    };

    // Check that there are two keys in each object: a,b and c,d
    if (!env1.hasOwnProperty('a') || !env1.hasOwnProperty('b') || !env2.hasOwnProperty('c') || !env2.hasOwnProperty('d')) {
        return {status: 'failed', reason: instructions('Key is uncorrect')};
    };

    // Check that values of keys are numbers in range of 1 and 1000000
    for (let i in env1) {
        if (typeof env1[i] !== 'number' || env1[i] < minValue || env1[i] > maxValue) {
            return {status: 'failed', reason: instructions('Values are uncorrect')};
        };
    };

    for (let i in env2) {
        if (typeof env2[i] !== 'number' || env2[i] < minValue || env2[i] > maxValue) {
            return {status: 'failed', reason: instructions('Values are uncorrect')};
        };
    };
    
    // Check which envelop is larger and return the number. Otherwise, return 0
    if (env1.a >= env2.c && env1.b > env2.d) return 1;
    if (env2.c >= env1.a && env2.d > env1.b) return 2;
    else return 0;
};

function instructions(name) {
    switch (name) {
        case 'Not an object': return 'Unvalid type of params. Should be two objects';
        case 'Key is uncorrect': return 'There is no such key in object as a, b, c or d';
        case 'Values are uncorrect': return 'Unvalid values. Must be numbers from 1 to 1000000';
    };
};

