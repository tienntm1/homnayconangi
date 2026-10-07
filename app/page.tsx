import Link from 'next/link';
import { Baby, BookHeart, Utensils, ArrowRight, HeartPulse } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-[2.5rem] p-8 md:p-16 shadow-sm border border-white/50 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 text-pink-200/50 rotate-[-15deg]"><Baby size={180} /></div>
        <div className="absolute -bottom-10 -right-10 text-purple-200/50 rotate-[15deg]"><BookHeart size={150} /></div>
        
        <div className="relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/60 text-pink-600 font-bold text-sm mb-4 backdrop-blur-sm border border-pink-200">
            Dành cho mẹ bỉm sữa hiện đại
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
            Chăm Sóc Bé Yêu <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Toàn Diện & Khoa Học</span>
          </h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto mb-8 font-medium">
            Khám phá cẩm nang dinh dưỡng, các bài viết chăm sóc sức khoẻ, và theo dõi quá trình phát triển của con bạn mỗi ngày.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/meals" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/30 transition-transform hover:-translate-y-1">
              Khám Phá Thực Đơn
            </Link>
            <Link href="/tracker" className="bg-white hover:bg-gray-50 text-pink-600 font-bold py-3.5 px-8 rounded-full shadow-md transition-transform hover:-translate-y-1">
              Đo Chiều Cao, Cân Nặng
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        
        <Link href="/meals" className="group bg-white p-8 rounded-[2rem] shadow-sm border border-pink-100 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-2">
          <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Utensils size={32} className="text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">Thực Đơn Dinh Dưỡng</h2>
          <p className="text-gray-500 mb-6 font-medium">Hàng trăm công thức ăn dặm, ăn cơm gia đình phân loại theo từng tháng tuổi giúp bé hay ăn chóng lớn.</p>
          <div className="text-pink-500 font-bold flex items-center gap-2">Xem chi tiết <ArrowRight size={18} /></div>
        </Link>

        <Link href="/handbooks" className="group bg-white p-8 rounded-[2rem] shadow-sm border border-pink-100 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-2">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <BookHeart size={32} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">Cẩm Nang Làm Mẹ</h2>
          <p className="text-gray-500 mb-6 font-medium">Các bài viết chuyên sâu về giấc ngủ, lịch sinh hoạt, lịch tiêm phòng, cách xử lý khi bé ốm.</p>
          <div className="text-pink-500 font-bold flex items-center gap-2">Đọc cẩm nang <ArrowRight size={18} /></div>
        </Link>

        <Link href="/tracker" className="group bg-white p-8 rounded-[2rem] shadow-sm border border-pink-100 hover:shadow-xl hover:shadow-pink-100 transition-all duration-300 hover:-translate-y-2">
          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <HeartPulse size={32} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-500 transition-colors">Theo Dõi Thể Chất</h2>
          <p className="text-gray-500 mb-6 font-medium">Công cụ đánh giá chiều cao, cân nặng của bé theo chuẩn biểu đồ tăng trưởng của WHO.</p>
          <div className="text-pink-500 font-bold flex items-center gap-2">Theo dõi ngay <ArrowRight size={18} /></div>
        </Link>

      </section>
    </div>
  );
}
