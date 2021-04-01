/* TASK 1
You have the job to implement a countdown function that will be used for the next NASA spatial mission. 
The function takes a duration in milliseconds and return a string in countdown format.
If it's counting down, the first character should be '-', if it's counting up it should be '+'. 
Then it should return the number of: hours (min 2 units), minutes (2 units) and seconds (2 units).
Examle: countdown(-154800000)  // return  '-43:00:00'
*/


function countdown (millsecs) {
    // Variables
    let sec = 1000;
    let millsecInMinute = 60 * sec;
    let millsecInHour = millsecInMinute * 60;
    let time;

    // Count how many hours, minutes and seconds in an argument of function
    let hours = parseInt(millsecs / millsecInHour);
    let minutes = parseInt(millsecs % millsecInHour / millsecInMinute);
    let seconds = parseInt(millsecs % millsecInHour % millsecInMinute / sec);

    // Create an array of arguments and add zero where it's needed
    time = [hours, minutes, seconds].map(el => {
        el = Math.abs(el);
        return String(el).length < 2 ? "0" + el : el;
    });
    // Change a string seperated by ':'
    time = time.join(':');

    // Add a sign and return result
    return millsecs >= 0 ? '+' + time : '-' + time;
}


// console.log(countdown(-154800000));
// console.log(countdown(0));
// console.log(countdown(61000));