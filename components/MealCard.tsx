import Link from 'next/link';
import { Star } from 'lucide-react';
import { NutritiousMeal } from '@/lib/db';
import Image from 'next/image';

export default function MealCard({ meal }: { meal: NutritiousMeal }) {
  return (
    <Link href={`/meal/${meal.id}`} className="block bg-white rounded-[2rem] shadow-sm border border-gray-100 mb-4 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 relative overflow-hidden group hover:-translate-y-2">
      
      {/* Image Thumbnail */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {meal.image_url ? (
          <Image 
            src={meal.image_url} 
            alt={meal.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-pink-100 flex items-center justify-center text-pink-300">
            <Star size={40} />
          </div>
        )}
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-md z-10">
          {meal.age_group.replace(/^\d+\.\s*/, '')}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-pink-500 transition-colors line-clamp-1">{meal.title}</h3>
        
        <div className="flex items-start gap-2 text-sm text-gray-600 mb-3 bg-green-50 p-3 rounded-xl border border-green-100">
          <Star size={16} className="text-yellow-500 shrink-0 mt-0.5 fill-yellow-500" />
          <p className="line-clamp-2"><strong>Công dụng:</strong> {meal.benefits}</p>
        </div>
        
        <div className="text-xs text-pink-500 font-bold flex items-center gap-1 mt-2">
          <span>Xem cách nấu</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}
