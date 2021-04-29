const http = require('http');
const url = require('url');
const fs = require('fs');
const { Client } = require('pg');
const connectionString = 'postgressql://postgres:vfrfhjdf18@localhost:5432/users';
const client = new Client({
    connectionString: connectionString
});

client.connect();

http.createServer((req, res) => {
    // Get data
    let query = url.parse(req.url, true).query;
    let { type } = query;
   
    // let users = JSON.parse(fs.readFileSync('users.json'), 'utf8');
   
   
    switch (type) {
        case ('reg'):
            let { name, surname, login, password, email, dob } = query;
            // Check that params are not empty
            if (!name || !surname || !login || !password || !email || !dob) {
                res.writeHead(418, { 'Content-Type': 'text/html' });
                res.write('Problem with registration');

                // Check that length is correct
            } else if (name.length > 50 || surname.length > 50 || login.length > 50 || password.length > 50 || password.length < 6) {
                res.writeHead(418, { 'Content-Type': 'text/html' });
                res.write('Problem with registration');

                // Check that name, surname and login don't contain numbers
            } else if (name.match(/\d/) || surname.match(/\d/)) {
                res.writeHead(418, { 'Content-Type': 'text/html' });
                res.write('Problem with registration');

            } 
            
            else {client.query(`SELECT LOGIN FROM USERS;`, (err, response) => {
                if (response.rows.find(el => el.login == login)) {
                    res.writeHead(418, { 'Content-Type': 'text/html' });
                    res.write('This login is already taken.');
                } else {
                    console.log(`Account ${login} was created`);
                    res.write(`User was added. User: name: ${name}, surname: ${surname}, login:${login}, password:${password},email:${email},date of birth:${dob}`);
                    const queryPg = `
                    INSERT INTO users (name,surname,login,password,email,dob) VALUES ('${name}', '${surname}', '${login}', '${password}', '${email}', '${dob}')
                    `;
                    client.query(queryPg, (err, response) => {
                        console.log(err);
                    })
                }

                console.log(err)
            })}

           
    //         else {
    //                 console.log(`Account ${login} was created`);
    //             const queryPg = `
    // INSERT INTO users (name,surname,login,password,email,dob) VALUES ('${name}', '${surname}', '${login}', '${password}', '${email}', '${dob}')
    // `;
                
    //             res.write(`User was added. User: name: ${name}, surname: ${surname}, login:${login}, password:${password},email:${email},date of birth:${dob}`);

    //             // Send new user to database
    //             client.query(queryPg, (err, res) => {
    //                 console.log(err);

    //             })
    //         };
    
            break;
        case ('auth'):

            let { authLogin, authPassword } = query;

            // if (users.find(el => el.login == authLogin && el.password == authPassword)) {
            //     let user = users.find(el => el.login == authLogin);
            //     console.log(user)
            //     res.write(`User: name: ${user.name}, surname: ${user.surname}, login:${user.login}, password:${user.password},email:${user.email},date of birth:${user.dob}`)
            // } else {
            //     res.write(`No such user`);
            // };
            break;
    }

    res.end();
}).listen(8000);

console.log(`Server on http://localhost:8000?type=reg&name=Harry&surname=Potter&login=Wizzard&password=wizzard&email=potter@gmail.com&dob=03/18/2000`);
console.log(`Server on http://localhost:8000?type=reg&name=Cheese&surname=Burger&login=EatMe&password=mcdonalds&email=cheesy@gmail.com&dob=03/18/2000`);

console.log(`Server on http://localhost:8000?type=auth&authLogin=Wizzard&authPassword=wizzard`);