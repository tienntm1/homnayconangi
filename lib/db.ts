import Database from 'better-sqlite3';
import path from 'path';

// Define the Meal interface
export interface Meal {
  id: string;
  date: string;
  time: string;
  food_name: string;
  amount: 'full' | 'half' | 'little' | 'none';
  note: string | null;
  created_at: string;
  updated_at: string;
}

// In Next.js, the current working directory during dev/build is the project root
const dbPath = path.join(process.cwd(), 'meals.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Initialize the database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS meals (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      food_name TEXT NOT NULL,
      amount TEXT NOT NULL,
      note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
  );
`);

export default db;
