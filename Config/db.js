import postgresql from 'pg';

const { Pool } = postgresql;

const pool = new Pool({
    user: "postgres",
    password: "pirulin2012",
    host: "localhost",
    port: "5432",
    database: "colegioweb"
});

export default pool;