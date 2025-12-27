import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

// Initialize database schema
export async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
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

    // Create indexes for better search performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_title ON games(title);
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_platform ON games(platform);
    `);

    // Enable trigram extension for fuzzy search (if available)
    try {
      await client.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);
      console.log('✅ pg_trgm extension enabled for fuzzy search');
    } catch (err) {
      console.log('⚠️  pg_trgm extension not available, using ILIKE for search');
    }

    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
