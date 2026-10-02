const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'meals.db');
const db = new Database(dbPath);

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

const generateId = () => Math.random().toString(36).substring(2, 15);

const meals = [
  { date: '2026-09-23', time: '07:30', food_name: 'Cháo thịt', amount: 'full', note: 'Ăn khá nhanh' },
  { date: '2026-09-23', time: '11:45', food_name: 'Cơm cá', amount: 'half', note: 'Không thích rau' },
  { date: '2026-09-23', time: '18:30', food_name: 'Súp bí đỏ', amount: 'full', note: '' },
  { date: '2026-09-24', time: '07:15', food_name: 'Bánh mì trứng', amount: 'little', note: '' },
  { date: '2026-09-24', time: '12:00', food_name: 'Cơm gà', amount: 'half', note: '' },
];

const stmt = db.prepare(`
  INSERT INTO meals (id, date, time, food_name, amount, note, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const meal of meals) {
    const now = new Date().toISOString();
    stmt.run(generateId(), meal.date, meal.time, meal.food_name, meal.amount, meal.note, now, now);
  }
})();

console.log('Seeded database with demo data.');
