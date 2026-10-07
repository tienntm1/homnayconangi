import { Pool } from 'pg';

export interface NutritiousMeal {
  id: string;
  title: string;
  age_group: string;
  ingredients: string;
  benefits: string;
  instructions: string;
  image_url: string;
  created_at: string;
}

export interface HandbookArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  icon: string;
  image_url: string;
  created_at: string;
}

// Dummy type for legacy components
export interface Meal {
  id: string;
  food_name: string;
  date: string;
  time: string;
  amount: string;
  note: string;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://user_c11d1ed51ee0:Dl9wAeFWNE_4x86x5dIbuEOhdG6ueMcD@vays-db-e5047891-postgresql-5432:5432/homnayconangi_db';

let pool: Pool;
try {
  pool = new Pool({
    connectionString
  });
} catch (e) {
  console.error("Failed to initialize database pool:", e);
  // Fallback to prevent immediate crash if connectionString is totally malformed
  pool = new Pool(); 
}

export default pool;
