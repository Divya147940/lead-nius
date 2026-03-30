const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://postgres:Divyanshi@123@127.0.0.1:5432/lead_genius';

const pool = new Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000
});

async function verify() {
    console.log('Testing connection to:', DATABASE_URL.replace(/:[^@]+@/, ':****@')); // Hide password in log
    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database!');
        const res = await client.query('SELECT NOW()');
        console.log('Database time:', res.rows[0].now);
        client.release();
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
    } finally {
        await pool.end();
    }
}

verify();
