const Pool = require('pg').Pool;

const pool = new Pool ({
    user:'postgres',
    password: 'vfrfhjdf18',
    database: 'shop',
    host: 'localhost',
    port:5432
});

module.exports = pool;