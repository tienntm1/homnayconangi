import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, UtensilsCrossed, Star, ListChecks } from 'lucide-react';
import { getMealById } from '@/lib/actions';

export const dynamic = 'force-dynamic';

export default async function MealDetailPage({ params }: { params: { id: string } }) {
  const meal = await getMealById(params.id);
  
  if (!meal) {
    notFound();
  }
  
  return (
    <div className="pb-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/" className="p-2 text-gray-500 hover:bg-gray-200 rounded-full bg-gray-100 transition-colors">
          <ChevronLeft size={20} />
        </Link>
        <span className="text-sm font-medium text-gray-500">Quay lại danh sách</span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-orange-50 p-6 border-b border-orange-100">
          <div className="inline-block bg-orange-200 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            {meal.age_group.replace(/^\d+\.\s*/, '')}
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 leading-tight">{meal.title}</h1>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Benefits Section */}
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
            <h2 className="text-green-800 font-bold flex items-center gap-2 mb-2">
              <Star size={18} className="fill-green-600 text-green-600" />
              Công dụng
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">{meal.benefits}</p>
          </div>

          {/* Ingredients Section */}
          <div>
            <h2 className="text-gray-800 font-bold flex items-center gap-2 mb-3 text-lg">
              <UtensilsCrossed size={18} className="text-orange-500" />
              Nguyên liệu
            </h2>
            <ul className="text-gray-700 text-sm leading-relaxed list-disc list-inside space-y-1 bg-gray-50 p-4 rounded-2xl">
              {meal.ingredients.split(',').map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h2 className="text-gray-800 font-bold flex items-center gap-2 mb-3 text-lg">
              <ListChecks size={18} className="text-blue-500" />
              Cách làm
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed space-y-3">
              {meal.instructions.split('\n').map((step, index) => (
                <p key={index} className="flex gap-2">
                  <span className="font-bold text-blue-500">{step.match(/^\d+\./)?.[0] || '•'}</span>
                  <span>{step.replace(/^\d+\.\s*/, '')}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
