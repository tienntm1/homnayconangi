import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import MealCard from '@/components/MealCard';
import { getMealsByDate } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const meals = await getMealsByDate(todayStr);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Hôm nay con đã ăn gì?</h1>
      
      {meals.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-500">Hôm nay chưa có bữa ăn nào.</p>
        </div>
      ) : (
        <div className="mb-6">
          {meals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
      
      <Link 
        href="/add" 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-primary text-white py-3.5 px-6 rounded-full font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 z-20 whitespace-nowrap"
      >
        <PlusCircle size={20} />
        Ghi bữa ăn
      </Link>
    </div>
  );
}
