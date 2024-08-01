const { Pool } = require('pg');

const pool = new Pool({
    user: 'robby_user',
    host: 'localhost',
    database: 'postgres',
    password: '1602',
    port: 5432,
});

module.exports = pool;