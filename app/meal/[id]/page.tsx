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
    <div className="pb-10 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/meals" className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-500 hover:text-pink-500 shadow-sm border border-gray-100 transition-colors">
          <ChevronLeft size={18} /> Quay lại danh sách
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-pink-100 overflow-hidden">
        
        {/* Hero Image */}
        {meal.image_url && (
          <div className="relative h-64 md:h-80 w-full bg-gray-100">
            <img 
              src={meal.image_url} 
              alt={meal.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-md">
                {meal.age_group.replace(/^\d+\.\s*/, '')}
              </div>
              <h1 className="text-3xl md:text-4xl font-black leading-tight drop-shadow-md">{meal.title}</h1>
            </div>
          </div>
        )}

        {!meal.image_url && (
          <div className="bg-orange-50 p-8 border-b border-orange-100">
            <div className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow-sm">
              {meal.age_group.replace(/^\d+\.\s*/, '')}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">{meal.title}</h1>
          </div>
        )}
        
        <div className="p-6 md:p-10 space-y-8">
          {/* Benefits Section */}
          <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-inner">
            <h2 className="text-green-800 font-bold flex items-center gap-2 mb-3 text-lg">
              <Star size={20} className="fill-green-600 text-green-600" />
              Công dụng dinh dưỡng
            </h2>
            <p className="text-gray-700 leading-relaxed font-medium">{meal.benefits}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ingredients Section */}
            <div>
              <h2 className="text-gray-800 font-black flex items-center gap-2 mb-4 text-xl">
                <div className="bg-orange-100 p-2 rounded-xl text-orange-500"><UtensilsCrossed size={20} /></div>
                Nguyên liệu
              </h2>
              <ul className="text-gray-700 leading-relaxed space-y-2 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                {meal.ingredients.split('\n').map((ingredient, index) => {
                  const text = ingredient.replace(/^-\s*/, '').trim();
                  if (!text) return null;
                  return (
                    <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">•</span>
                    <span className="font-medium">{text}</span>
                  </li>
                )})}
              </ul>
            </div>

            {/* Instructions Section */}
            <div>
              <h2 className="text-gray-800 font-black flex items-center gap-2 mb-4 text-xl">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-500"><ListChecks size={20} /></div>
                Cách chế biến
              </h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                {meal.instructions.split('\n').map((step, index) => {
                  const num = step.match(/^\d+\./)?.[0] || '•';
                  const text = step.replace(/^\d+\.\s*/, '');
                  if (!text.trim()) return null;
                  return (
                    <div key={index} className="flex gap-4">
                      <span className="font-black text-blue-500 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">{num.replace('.', '')}</span>
                      <span className="font-medium mt-1">{text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
