const pgPromise = require('pg-promise');

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
};

const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(cn); // get connection to your db instance

exports.psql = psql;
