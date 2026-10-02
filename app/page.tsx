import MealCard from '@/components/MealCard';
import { getAllMeals } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
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
    <div className="pb-4">
      <div className="bg-primary/10 -mx-4 -mt-4 p-6 mb-6 rounded-b-3xl border-b border-primary/20">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">Sổ Tay Dinh Dưỡng</h1>
        <p className="text-gray-600 text-sm text-center">Gợi ý các bữa ăn khoa học giúp bé phát triển toàn diện cả thể chất lẫn trí não.</p>
      </div>
      
      {Object.entries(groupedMeals).map(([ageGroup, ageMeals]) => (
        <div key={ageGroup} className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800 bg-gray-200 px-3 py-1.5 rounded-lg">
              {ageGroup.replace(/^\d+\.\s*/, '')}
            </h2>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <div>
            {ageMeals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      ))}
      
      {meals.length === 0 && (
        <div className="text-center p-10 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500">Chưa có dữ liệu món ăn.</p>
        </div>
      )}
    </div>
  );
}
