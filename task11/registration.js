const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    // Get data
    let query = url.parse(req.url,true).query;
    let type = query;
    let users = JSON.parse(fs.readFileSync('users.json'),'utf8');
    let {name,surname,login,password,email,dob} = query;
        // Check that params are not empty
    if (!name || !surname || ! login || !password || !email || !dob) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
        message = 'Problem with registration';

    // Check that length is correct
    } else if (name.length > 50 || surname.length > 50 || login.length > 50 || password.length > 50 || password.length < 6) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
        message = 'Problem with registration';

        // Check that name, surname and login don't contain numbers
    } else if (name.match(/\d/) || surname.match(/\d/) || login.match(/\d/)) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
        message = 'Problem with registration';

    }else if (users.find(el => el.login === login)) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.write('Problem with registration');
        message = 'Problem with registration';

    } else {
        users.push(query);
        fs.writeFile('users.json', JSON.stringify(users), er => {
            console.log(`Account ${login} was created`);
        });
        message = `User was added. User: name: ${name}, surname: ${surname}, login:${login}, password:${password},email:${email},date of birth:${dob}`;
    }
    console.log(type);
    res.write(JSON.stringify(message));
    res.end();
}).listen(8000);

console.log(`Server on http://localhost:8000`);