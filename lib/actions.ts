'use server';

import db, { Meal } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export async function getMealsByDate(dateStr: string): Promise<Meal[]> {
  const stmt = db.prepare('SELECT * FROM meals WHERE date = ? ORDER BY time DESC, created_at DESC');
  return stmt.all(dateStr) as Meal[];
}

export async function getMealById(id: string): Promise<Meal | undefined> {
  const stmt = db.prepare('SELECT * FROM meals WHERE id = ?');
  return stmt.get(id) as Meal | undefined;
}

export async function getRecentFoodNames(): Promise<string[]> {
  // Get unique food names from the last 20 meals
  const stmt = db.prepare('SELECT DISTINCT food_name FROM meals ORDER BY created_at DESC LIMIT 20');
  const rows = stmt.all() as { food_name: string }[];
  return rows.map(r => r.food_name).slice(0, 5); // return up to 5
}

export async function addMeal(formData: FormData) {
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const food_name = formData.get('food_name') as string;
  const amount = formData.get('amount') as string;
  const note = (formData.get('note') as string) || '';

  if (!food_name || !amount) {
    throw new Error('Vui lòng nhập tên món ăn và lượng ăn');
  }

  const id = generateId();
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO meals (id, date, time, food_name, amount, note, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(id, date, time, food_name, amount, note, now, now);

  revalidatePath('/');
  revalidatePath('/history');
  redirect('/');
}

export async function updateMeal(id: string, formData: FormData) {
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const food_name = formData.get('food_name') as string;
  const amount = formData.get('amount') as string;
  const note = (formData.get('note') as string) || '';

  const now = new Date().toISOString();

  const stmt = db.prepare(`
    UPDATE meals
    SET date = ?, time = ?, food_name = ?, amount = ?, note = ?, updated_at = ?
    WHERE id = ?
  `);

  stmt.run(date, time, food_name, amount, note, now, id);

  revalidatePath('/');
  revalidatePath('/history');
  redirect('/');
}

export async function deleteMeal(id: string) {
  const stmt = db.prepare('DELETE FROM meals WHERE id = ?');
  stmt.run(id);

  revalidatePath('/');
  revalidatePath('/history');
}
