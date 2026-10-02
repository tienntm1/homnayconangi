const { Pool } = require('pg');

const connectionString = 'postgresql://user_c11d1ed51ee0:Dl9wAeFWNE_4x86x5dIbuEOhdG6ueMcD@vibe.tinhgon.xyz:30005/postgresql_instance';

const pool = new Pool({
  connectionString,
  ssl: false
});

const generateId = () => Math.random().toString(36).substring(2, 15);

const meals = [
  { date: '2026-09-23', time: '07:30', food_name: 'Cháo thịt', amount: 'full', note: 'Ăn khá nhanh' },
  { date: '2026-09-23', time: '11:45', food_name: 'Cơm cá', amount: 'half', note: 'Không thích rau' },
  { date: '2026-09-23', time: '18:30', food_name: 'Súp bí đỏ', amount: 'full', note: '' },
  { date: '2026-09-24', time: '07:15', food_name: 'Bánh mì trứng', amount: 'little', note: '' },
  { date: '2026-09-24', time: '12:00', food_name: 'Cơm gà', amount: 'half', note: '' },
];

async function seed() {
  console.log('Connecting to PostgreSQL and preparing table...');
  
  await pool.query(`
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
  `);

  console.log('Inserting demo data...');

  for (const meal of meals) {
    const now = new Date().toISOString();
    await pool.query(`
      INSERT INTO meals (id, date, time, food_name, amount, note, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [generateId(), meal.date, meal.time, meal.food_name, meal.amount, meal.note, now, now]);
  }

  console.log('Seeded database with demo data successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
