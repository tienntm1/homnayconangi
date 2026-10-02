import { notFound } from 'next/navigation';
import MealForm from '@/components/MealForm';
import { getMealById } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function EditMealPage({ params }: { params: { id: string } }) {
  const meal = await getMealById(params.id);
  
  if (!meal) {
    notFound();
  }
  
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4">Sửa bữa ăn</h1>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <MealForm initialData={meal} recentFoods={[]} />
      </div>
    </div>
  );
}
