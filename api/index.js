import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('Lead Genius Backend API with Prisma is running...');
});

// Registration Endpoint
app.post('/api/register', async (req, res) => {
  const { 
    fullName, 
    email,
    password,
    linkedin, 
    startupName, 
    startupUrl, 
    stage, 
    industry, 
    lookingFor, 
    betaPerk 
  } = req.body;

  try {
    const registration = await prisma.registration.create({
      data: {
        fullName,
        email,
        password,
        linkedin,
        startupName,
        startupUrl,
        stage,
        industry,
        lookingFor,
        betaPerk
      }
    });
    console.log('Registration saved with Prisma:', registration);
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    console.error('Error saving registration with Prisma:', err.message);
    res.status(500).json({ error: 'Failed to save registration' });
  }
});

// Get all registrations
app.get('/api/registrations', async (req, res) => {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        timestamp: 'desc'
      }
    });
    res.json(registrations);
  } catch (err) {
    console.error('Error fetching registrations with Prisma:', err.message);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

