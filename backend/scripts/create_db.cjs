const { Client } = require('pg');

const config = {
    user: 'postgres',
    host: '127.0.0.1',
    password: 'Divyanshi@123',
    port: 5432,
    database: 'postgres'
};

async function createDb() {
    const client = new Client(config);
    try {
        await client.connect();
        console.log('Connected to default postgres database.');
        
        // Check if database exists
        const checkRes = await client.query("SELECT 1 FROM pg_database WHERE datname = 'lead_genius'");
        if (checkRes.rows.length > 0) {
            console.log("Database 'lead_genius' already exists.");
        } else {
            // Cannot run CREATE DATABASE in a transaction, and Client handles this fine
            await client.query('CREATE DATABASE lead_genius');
            console.log("Database 'lead_genius' created successfully!");
        }
    } catch (err) {
        console.error('Error creating database:', err.message);
    } finally {
        await client.end();
    }
}

createDb();
