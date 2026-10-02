'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Meal } from '@/lib/db';
import { deleteMeal } from '@/lib/actions';

const amountMap: Record<string, string> = {
  full: 'Ăn hết',
  half: 'Ăn khoảng 1/2',
  little: 'Ăn ít',
  none: 'Không ăn',
};

const amountColors: Record<string, string> = {
  full: 'bg-green-100 text-green-800',
  half: 'bg-blue-100 text-blue-800',
  little: 'bg-yellow-100 text-yellow-800',
  none: 'bg-red-100 text-red-800',
};

export default function MealCard({ meal }: { meal: Meal }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('Bạn có chắc muốn xóa bữa ăn này?')) {
      setIsDeleting(true);
      await deleteMeal(meal.id);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3 relative overflow-hidden">
      {isDeleting && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <span className="text-gray-500 text-sm">Đang xóa...</span>
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <Clock size={14} />
          <span>{meal.time}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/edit/${meal.id}`} className="p-1.5 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100 transition-colors">
            <Pencil size={16} />
          </Link>
          <button onClick={handleDelete} className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 mb-2">{meal.food_name}</h3>
      
      <div className="flex flex-wrap gap-2 mb-2">
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${amountColors[meal.amount] || 'bg-gray-100 text-gray-800'}`}>
          {amountMap[meal.amount] || meal.amount}
        </span>
      </div>
      
      {meal.note && (
        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex items-start gap-1.5">
          <AlertCircle size={14} className="mt-0.5 shrink-0 text-gray-400" />
          <p>{meal.note}</p>
        </div>
      )}
    </div>
  );
}
