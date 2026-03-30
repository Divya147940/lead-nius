const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://postgres:Divyanshi%40123@127.0.0.1:5432/lead_genius';

const pool = new Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000
});

async function checkTable() {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'registrations')");
        if (res.rows[0].exists) {
            console.log("Table 'registrations' exists. Backend setup looks good!");
        } else {
            console.log("Table 'registrations' does NOT exist yet. Needs initialization.");
        }
        client.release();
    } catch (err) {
        console.error('Error checking table:', err.message);
    } finally {
        await pool.end();
    }
}

checkTable();
