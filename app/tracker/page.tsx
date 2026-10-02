'use client';
import { useState } from 'react';
import { HeartPulse, Calculator, Info } from 'lucide-react';

export default function TrackerPage() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'boy' | 'girl'>('boy');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ status: string; color: string; message: string } | null>(null);

  const calculateGrowth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !weight || !height) return;

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age); // months

    // Rất đơn giản hóa logic để hiển thị demo (Thực tế cần dùng mảng chuẩn WHO)
    let status = 'Bình thường';
    let color = 'text-green-600 bg-green-50 border-green-200';
    let message = 'Tuyệt vời! Bé đang phát triển rất tốt. Mẹ tiếp tục duy trì chế độ dinh dưỡng hiện tại nhé.';

    if (w < a * 0.3 + 3) {
      status = 'Hơi nhẹ cân';
      color = 'text-orange-600 bg-orange-50 border-orange-200';
      message = 'Bé hơi nhẹ cân so với tháng tuổi. Mẹ có thể tham khảo thêm các thực đơn tăng cân ở mục Cẩm Nang.';
    } else if (w > a * 0.4 + 4) {
      status = 'Tròn trịa';
      color = 'text-blue-600 bg-blue-50 border-blue-200';
      message = 'Bé khá mũm mĩm đáng yêu! Nên cân đối rau xanh và đạm để bé khỏe mạnh nhất.';
    }

    setResult({ status, color, message });
  };

  return (
    <div className="pb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-100 p-3 rounded-2xl text-green-500">
          <HeartPulse size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800">Theo Dõi Thể Chất</h1>
          <p className="text-gray-500 font-medium">Đánh giá nhanh chiều cao, cân nặng của bé.</p>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-sm border border-green-100">
        <form onSubmit={calculateGrowth} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Giới tính</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setGender('boy')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${gender === 'boy' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Bé Trai</button>
                <button type="button" onClick={() => setGender('girl')} className={`flex-1 py-3 rounded-2xl font-bold transition-all ${gender === 'girl' ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Bé Gái</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tháng tuổi</label>
              <input type="number" min="1" max="60" value={age} onChange={(e) => setAge(e.target.value)} required placeholder="VD: 12" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none font-medium" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Cân nặng (kg)</label>
              <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} required placeholder="VD: 9.5" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Chiều cao (cm)</label>
              <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required placeholder="VD: 75" className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none font-medium" />
            </div>
          </div>

          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-1">
            <Calculator size={20} /> Kiểm tra ngay
          </button>
        </form>

        {result && (
          <div className={`mt-8 p-6 rounded-[2rem] border-2 ${result.color} animate-in fade-in slide-in-from-bottom-4`}>
            <h3 className="text-xl font-black mb-2 flex items-center gap-2">Kết quả: {result.status}</h3>
            <p className="font-medium opacity-90">{result.message}</p>
          </div>
        )}

        <div className="mt-8 flex items-start gap-3 p-4 bg-gray-50 rounded-2xl text-gray-500 text-sm">
          <Info size={20} className="shrink-0 mt-0.5 text-gray-400" />
          <p>Lưu ý: Kết quả mang tính chất tham khảo tương đối. Mỗi em bé có một biểu đồ phát triển riêng, mẹ đừng quá lo lắng nếu bé chỉ lệch một chút so với chuẩn nhé!</p>
        </div>
      </div>
    </div>
  );
}
