'use server';

import pool, { Meal } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export async function getMealsByDate(dateStr: string): Promise<Meal[]> {
  const result = await pool.query('SELECT * FROM meals WHERE date = $1 ORDER BY time DESC, created_at DESC', [dateStr]);
  return result.rows.map(row => ({
    ...row,
    created_at: new Date(row.created_at).toISOString(),
    updated_at: new Date(row.updated_at).toISOString()
  })) as Meal[];
}

export async function getMealById(id: string): Promise<Meal | undefined> {
  const result = await pool.query('SELECT * FROM meals WHERE id = $1', [id]);
  if (!result.rows[0]) return undefined;
  
  return {
    ...result.rows[0],
    created_at: new Date(result.rows[0].created_at).toISOString(),
    updated_at: new Date(result.rows[0].updated_at).toISOString()
  } as Meal;
}

export async function getRecentFoodNames(): Promise<string[]> {
  const result = await pool.query(`
    SELECT food_name 
    FROM meals 
    GROUP BY food_name 
    ORDER BY MAX(created_at) DESC 
    LIMIT 5
  `);
  return result.rows.map(r => r.food_name);
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

  await pool.query(`
    INSERT INTO meals (id, date, time, food_name, amount, note, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `, [id, date, time, food_name, amount, note, now, now]);

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

  await pool.query(`
    UPDATE meals
    SET date = $1, time = $2, food_name = $3, amount = $4, note = $5, updated_at = $6
    WHERE id = $7
  `, [date, time, food_name, amount, note, now, id]);

  revalidatePath('/');
  revalidatePath('/history');
  redirect('/');
}

export async function deleteMeal(id: string) {
  await pool.query('DELETE FROM meals WHERE id = $1', [id]);
  revalidatePath('/');
  revalidatePath('/history');
}
