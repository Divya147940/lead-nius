const { Pool } = require('pg');

const DATABASE_URL = 'postgresql://postgres:Divyanshi%40123@127.0.0.1:5432/lead_genius';

const pool = new Pool({
    connectionString: DATABASE_URL,
    connectionTimeoutMillis: 5000
});

async function testInsert() {
    const testData = {
        fullName: 'Test User',
        linkedin: 'https://linkedin.com/in/testuser',
        startupName: 'Test Startup',
        startupUrl: 'https://teststartup.com',
        stage: 'MVP/Beta',
        industry: 'SaaS',
        lookingFor: ['Beta Testers & Feedback', 'First Paying Customers'],
        betaPerk: 'Lifetime Access (LTD)'
    };

    const insertQuery = `
        INSERT INTO registrations (
            fullName, 
            linkedin, 
            startupName, 
            startupUrl, 
            stage, 
            industry, 
            lookingFor, 
            betaPerk
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;

    try {
        const client = await pool.connect();
        const res = await client.query(insertQuery, [
            testData.fullName,
            testData.linkedin,
            testData.startupName,
            testData.startupUrl,
            testData.stage,
            testData.industry,
            testData.lookingFor,
            testData.betaPerk
        ]);
        console.log('Test registration saved successfully:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('Error saving test registration:', err.message);
    } finally {
        await pool.end();
    }
}

testInsert();
