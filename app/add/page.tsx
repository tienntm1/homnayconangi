import MealForm from '@/components/MealForm';
import { getRecentFoodNames } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function AddMealPage() {
  const recentFoods = await getRecentFoodNames();
  
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Ghi bữa ăn mới</h1>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <MealForm recentFoods={recentFoods} />
      </div>
    </div>
  );
}
