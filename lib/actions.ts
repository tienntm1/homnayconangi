'use server';

import pool, { NutritiousMeal } from './db';

export async function getAllMeals(): Promise<NutritiousMeal[]> {
  const result = await pool.query('SELECT * FROM nutritious_meals ORDER BY age_group, created_at DESC');
  return result.rows.map(row => ({
    ...row,
    created_at: new Date(row.created_at).toISOString(),
  })) as NutritiousMeal[];
}

export async function getMealById(id: string): Promise<NutritiousMeal | undefined> {
  const result = await pool.query('SELECT * FROM nutritious_meals WHERE id = $1', [id]);
  if (!result.rows[0]) return undefined;
  
  return {
    ...result.rows[0],
    created_at: new Date(result.rows[0].created_at).toISOString(),
  } as NutritiousMeal;
}
