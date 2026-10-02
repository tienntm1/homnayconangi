import MealCard from '@/components/MealCard';
import { getAllMeals } from '@/lib/actions';
import { ChefHat } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function MealsPage() {
  const meals = await getAllMeals();

  // Group meals by age group
  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.age_group]) {
      acc[meal.age_group] = [];
    }
    acc[meal.age_group].push(meal);
    return acc;
  }, {} as Record<string, typeof meals>);

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-orange-100 p-3 rounded-2xl text-orange-500">
          <ChefHat size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800">Thực Đơn Của Bé</h1>
          <p className="text-gray-500 font-medium">Gợi ý bữa ăn dặm đủ chất, thơm ngon.</p>
        </div>
      </div>
      
      {Object.entries(groupedMeals).map(([ageGroup, ageMeals]) => (
        <div key={ageGroup} className="mb-10 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-pink-100/50">
          <h2 className="text-2xl font-black text-pink-500 mb-6 inline-block bg-pink-50 px-4 py-2 rounded-2xl">
            {ageGroup.replace(/^\d+\.\s*/, '')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ageMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      ))}
      
      {meals.length === 0 && (
        <div className="text-center p-12 bg-white rounded-[2rem] border border-dashed border-pink-200">
          <p className="text-gray-500 font-medium text-lg">Chưa có dữ liệu món ăn.</p>
        </div>
      )}
    </div>
  );
}
