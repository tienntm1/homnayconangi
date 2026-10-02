import { Pool } from 'pg';

export interface NutritiousMeal {
  id: string;
  title: string;
  age_group: string;
  ingredients: string;
  benefits: string;
  instructions: string;
  created_at: string;
}

const connectionString = 'postgresql://user_c11d1ed51ee0:Dl9wAeFWNE_4x86x5dIbuEOhdG6ueMcD@vibe.tinhgon.xyz:30005/postgresql_instance';

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database
pool.query(`
  CREATE TABLE IF NOT EXISTS nutritious_meals (
      id VARCHAR(50) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      age_group VARCHAR(100) NOT NULL,
      ingredients TEXT NOT NULL,
      benefits TEXT NOT NULL,
      instructions TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`).catch(err => console.error('Error creating table:', err));

export default pool;
