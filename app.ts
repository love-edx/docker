// app.ts
import express from 'express';
import { Client } from 'pg';
import dotenv from 'dotenv';

// This error should crash whole process
const envFound = dotenv.config();
if (!envFound) throw new Error('⚠️ Couldn not find .env file ⚠️');

const app = express();
const PORT = process.env.PORT || 3001;

console.log(
  process.env.DB_USER,
  process.env.DB_HOST,
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  process.env.DB_PORT
);

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Connect to PostgreSQL
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1); // Exit process on connection error
  });

app.get('/', async (req, res) => {
  // Connect to PostgreSQL
  try {
    // Perform a simple query to PostgreSQL
    const result = await client.query('SELECT NOW()');

    console.log('Query result:', result.rows);

    // Output the result
    res.status(200).send(result.rows[0]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
