import Link from 'next/link';
import { Star } from 'lucide-react';
import { NutritiousMeal } from '@/lib/db';

export default function MealCard({ meal }: { meal: NutritiousMeal }) {
  return (
    <Link href={`/meal/${meal.id}`} className="block bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1.5 rounded-bl-xl">
        {meal.age_group.replace(/^\d+\.\s*/, '')}
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2 pr-20 group-hover:text-primary transition-colors">{meal.title}</h3>
      
      <div className="flex items-start gap-2 text-sm text-gray-600 mb-3 bg-green-50 p-3 rounded-xl border border-green-100">
        <Star size={16} className="text-yellow-500 shrink-0 mt-0.5 fill-yellow-500" />
        <p className="line-clamp-2"><strong>Công dụng:</strong> {meal.benefits}</p>
      </div>
      
      <div className="text-xs text-primary font-semibold flex items-center gap-1 mt-2">
        <span>Xem chi tiết công thức</span>
        <span>→</span>
      </div>
    </Link>
  );
}
