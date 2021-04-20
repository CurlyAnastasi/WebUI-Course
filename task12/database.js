const {Client } = require('pg');
const connectionString = 'postgressql://postgres:vfrfhjdf18@localhost:5432/users';
const client = new Client({
    connectionString:connectionString
});
const users = require('./users.json');
client.connect();

for (let el of users) {
  const query = `
  INSERT INTO users (name,surname,login,password,email,dob)
VALUES ('${el.name}', '${el.surname}', '${el.login}', '${el.password}', '${el.email}', '${el.dob}')
  `;
  client.query(query, (err, res) => {
    console.log(err,res);
    client.end();
  })
};

// client.query(`SELECT * FROM USERS;`, (err, res) => {
//   console.log(err, res);
//   client.end();
// })
// const query = users.forEach((el)=> { `INSERT INTO users (name,surname,login,password,email,dob)
// VALUES (${el.name}, ${el.surname}, ${el.login}, ${el.password}, ${el.email}, ${el.dob})`;})



