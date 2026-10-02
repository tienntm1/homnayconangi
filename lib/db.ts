import { Pool } from 'pg';

export interface Meal {
  id: string;
  date: string;
  time: string;
  food_name: string;
  amount: 'full' | 'half' | 'little' | 'none';
  note: string | null;
  created_at: Date | string;
  updated_at: Date | string;
}

const connectionString = 'postgresql://user_c11d1ed51ee0:Dl9wAeFWNE_4x86x5dIbuEOhdG6ueMcD@vibe.tinhgon.xyz:30005/postgresql_instance';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database
pool.query(`
  CREATE TABLE IF NOT EXISTS meals (
      id VARCHAR(50) PRIMARY KEY,
      date VARCHAR(20) NOT NULL,
      time VARCHAR(10) NOT NULL,
      food_name VARCHAR(255) NOT NULL,
      amount VARCHAR(20) NOT NULL,
      note TEXT,
      created_at TIMESTAMP NOT NULL,
      updated_at TIMESTAMP NOT NULL
  );
`).catch(err => console.error('Error creating table:', err));

export default pool;
