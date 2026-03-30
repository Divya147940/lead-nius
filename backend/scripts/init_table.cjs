const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://postgres:Divyanshi%40123@127.0.0.1:5432/lead_genius';

const pool = new Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000
});

async function initDb() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS registrations (
            id SERIAL PRIMARY KEY,
            fullName TEXT,
            linkedin TEXT,
            startupName TEXT,
            startupUrl TEXT,
            stage TEXT,
            industry TEXT,
            lookingFor TEXT[],
            betaPerk TEXT,
            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        console.log("Table 'registrations' initialized successfully!");
        client.release();
    } catch (err) {
        console.error('Error initializing database:', err.message);
    } finally {
        await pool.end();
    }
}

initDb();
