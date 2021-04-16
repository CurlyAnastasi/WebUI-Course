const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res) => {
    // Get data
    let {name,surname,login,password,email,dob} = url.parse(req.url,true).query;

    // Check that params are not empty
    if (!name || !surname || ! login || !password || !email || !dob) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
    // Check that length is correct
    } else if (name.length > 50 || surname.length > 50 || login.length > 50 || password.length > 50 || password.length < 6) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
        // Check that name, surname and login don't contain numbers
    } else if (name.match(/\d/) || surname.match(/\d/) || login.match(/\d/)) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
    }
     else {
        addNewUser(name,surname,login,password,email,dob);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`User was added. User: name: ${name}, surname: ${surname}, login:${login}, password:${password},email:${email},date of birth:${dob}`);
    }
   
    res.end();
}).listen(8000);

function addNewUser (name,surname,login,password,email,dob) {
    const data = `
    name: ${name},
    surname: ${surname},
    login: ${login},
    password: ${password},
    email: ${email},
    dob: ${dob}
    `;
    fs.appendFile('users.txt', data, () => console.log('New user was added'));
}

console.log('Server on http://localhost:8000/?name=absd&surname=asd&login=Abcd&password=1234a567&email=1@gmail.com&dob=2020/12/03')