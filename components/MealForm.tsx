'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addMeal, updateMeal } from '@/lib/actions';
import { Meal } from '@/lib/db';

interface MealFormProps {
  initialData?: Meal;
  recentFoods: string[];
}

export default function MealForm({ initialData, recentFoods }: MealFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [foodName, setFoodName] = useState(initialData?.food_name || '');
  
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (initialData) {
        await updateMeal(initialData.id, formData);
      } else {
        await addMeal(formData);
      }
      alert('Đã lưu bữa ăn.');
    } catch (err: any) {
      setError(err.message || 'Không thể lưu dữ liệu. Vui lòng thử lại.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ngày</label>
          <input 
            type="date" 
            name="date" 
            defaultValue={initialData?.date || todayStr} 
            required 
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
          <input 
            type="time" 
            name="time" 
            defaultValue={initialData?.time || timeStr} 
            required 
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tên món ăn <span className="text-red-500">*</span></label>
        <input 
          type="text" 
          name="food_name" 
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          placeholder="VD: Cháo thịt băm"
          required 
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
        
        {recentFoods.length > 0 && !initialData && (
          <div className="mt-2.5">
            <span className="text-xs text-gray-500 mb-1.5 block">Món ăn gần đây:</span>
            <div className="flex flex-wrap gap-2">
              {recentFoods.map(food => (
                <button
                  key={food}
                  type="button"
                  onClick={() => setFoodName(food)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs py-1.5 px-3 rounded-full transition-colors font-medium"
                >
                  {food}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lượng ăn <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'full', label: 'Ăn hết', color: 'peer-checked:bg-green-100 peer-checked:text-green-800 peer-checked:border-green-500' },
            { value: 'half', label: 'Ăn khoảng 1/2', color: 'peer-checked:bg-blue-100 peer-checked:text-blue-800 peer-checked:border-blue-500' },
            { value: 'little', label: 'Ăn ít', color: 'peer-checked:bg-yellow-100 peer-checked:text-yellow-800 peer-checked:border-yellow-500' },
            { value: 'none', label: 'Không ăn', color: 'peer-checked:bg-red-100 peer-checked:text-red-800 peer-checked:border-red-500' }
          ].map(option => (
            <label key={option.value} className="cursor-pointer relative">
              <input 
                type="radio" 
                name="amount" 
                value={option.value} 
                defaultChecked={initialData?.amount === option.value}
                required
                className="peer sr-only" 
              />
              <div className={`p-3 text-center text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors ${option.color}`}>
                {option.label}
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú (Tùy chọn)</label>
        <textarea 
          name="note" 
          defaultValue={initialData?.note || ''}
          rows={3} 
          placeholder="Ví dụ: Con ăn nhanh, hoặc con bị chớ..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
        ></textarea>
      </div>
      
      <div className="pt-4 flex gap-3">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex-1 py-3.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
        >
          Hủy
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="flex-1 py-3.5 px-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Đang lưu...' : (initialData ? 'Lưu thay đổi' : 'Lưu bữa ăn')}
        </button>
      </div>
    </form>
  );
}
