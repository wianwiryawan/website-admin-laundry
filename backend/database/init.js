const { Pool } = require('pg');
const config = require('./db.conf');
const keys = require('./db.keys');

const pool = new Pool({
    host: config.host,
    user: keys.DB_USERNAME,
    port: config.port,
    database: keys.DB_NAME,
    password: keys.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});

module.exports = pool;