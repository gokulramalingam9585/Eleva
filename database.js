const { Pool } = require("pg");
const pool = new Pool({
    host: 'localhost',
    port: 9000,
    user: 'postgres',
    password: 'root',
    database: 'test'
});
module.exports = pool;