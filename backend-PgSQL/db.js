const Pool = require("pg").Pool;
const { USER, PASSWORD, HOST, DB_PORT, DB1 } = require("./config.js");

const pool = new Pool({
    user: USER,
    password: PASSWORD,
    host: HOST,
    port: DB_PORT,
    database: DB1
});

module.exports = pool;