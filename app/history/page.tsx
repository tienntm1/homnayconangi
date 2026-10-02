import Link from 'next/link';
import { redirect } from 'next/navigation';
import MealCard from '@/components/MealCard';
import { getMealsByDate } from '@/lib/actions';
import { ChevronLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: { date?: string };
}) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  
  const selectedDate = searchParams.date || todayStr;
  
  const meals = await getMealsByDate(selectedDate);
  
  // Format selected date for display
  const dateObj = new Date(selectedDate);
  const displayDate = !isNaN(dateObj.getTime()) 
    ? dateObj.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' })
    : selectedDate;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Lịch sử ăn uống</h1>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
        <form action={async (formData) => {
          'use server';
          const date = formData.get('date') as string;
          redirect(`/history?date=${date}`);
        }} className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Chọn ngày</label>
            <input 
              type="date" 
              name="date" 
              defaultValue={selectedDate}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
          <button type="submit" className="py-2.5 px-5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Xem
          </button>
        </form>
      </div>

      <h2 className="text-md font-semibold text-gray-700 mb-3 capitalize">
        {selectedDate === todayStr ? 'Hôm nay' : displayDate}
      </h2>

      {meals.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center shadow-sm border border-gray-100">
          <p className="text-gray-500">Không có bữa ăn nào trong ngày này.</p>
        </div>
      ) : (
        <div>
          {meals.map(meal => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
}
