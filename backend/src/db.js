import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
let pool;
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Keep-alive removed in favor of short idle timeouts
// to ensure fresh connections for every request burst

// NO POOLING - DIRECT CLIENT STRATEGY
// This connects, queries, and disconnects for EVERY request.
// It is slower (higher latency) but IMMUNE to idle timeouts.

const { Client } = pg;

// We don't initialize a pool anymore.
export async function initializeDatabase() {
  // Just test one connection to make sure credentials are valid
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database (Test Connection)');

    // Run init queries
    await client.query(`
      CREATE TABLE IF NOT EXISTS games (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        platform VARCHAR(100) NOT NULL,
        region VARCHAR(50) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        discount_percentage INTEGER,
        cover_image_url TEXT NOT NULL,
        has_cashback BOOLEAN DEFAULT false,
        stock_status VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_title ON games(title);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_platform ON games(platform);`);

    // Enable extensions
    try {
      await client.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
    } catch (e) { console.log('Ext warning:', e.message); }

    console.log('✅ Database schema initialized');
  } catch (err) {
    console.error('❌ Init failed:', err);
    throw err;
  } finally {
    await client.end();
  }
}

// Dummy getter for compatibility
export const getPool = async () => null;

export default {
  query: async (text, params) => {
    // Create FRESH connection for every single query
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });

    try {
      await client.connect();
      const res = await client.query(text, params);
      return res;
    } catch (err) {
      console.error('❌ Query failed:', err.message);
      throw err;
    } finally {
      // ALWAYS close immediately
      await client.end();
    }
  },
  end: async () => { } // No-op
};
