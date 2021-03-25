/*Task
Implement a function that receives 2 IPv4 addresses,
and returns the number of addresses between them (including the first one,
excluding the last one).
All inputs will bee valid IPv4 addresses in the form of strings. 
The last address will always be greater than the first one. 
 */

function ipsBetween(ips1, ips2) {
    ips1 = ips1.split('.');
    return ips2.split('.').reduce(function (sum, x, i) {
        return (sum << 8) + Number(x) - Number(ips1[i])
    }, 0);
}

// console.log(ipsBetween('10.0.0.0', '10.0.0.50'));
// console.log(ipsBetween('10.0.0.0', '10.0.1.0'));