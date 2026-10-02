import Link from 'next/link';
import { BookHeart, ArrowRight } from 'lucide-react';
import { getAllArticles } from '@/lib/actions';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HandbooksPage() {
  const articles = await getAllArticles();

  return (
    <div className="pb-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-2xl text-blue-500">
          <BookHeart size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-gray-800">Cẩm Nang Làm Mẹ</h1>
          <p className="text-gray-500 font-medium">Kiến thức chăm sóc bé yêu khỏe mạnh, thông minh.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/handbooks/${article.id}`} className="flex flex-col bg-white rounded-[2rem] shadow-sm border border-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
            
            <div className="relative h-48 w-full bg-blue-50">
              {article.image_url && (
                <Image 
                  src={article.image_url} 
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-2xl shadow-sm">
                {article.icon}
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2 block">{article.category}</span>
              <h2 className="text-xl font-black text-gray-800 mb-3 group-hover:text-blue-500 transition-colors leading-tight line-clamp-2">{article.title}</h2>
              <p className="text-gray-500 text-sm font-medium mb-4 line-clamp-3 flex-1">{article.summary}</p>
              <div className="text-blue-500 text-sm font-bold flex items-center gap-1 mt-auto">Đọc tiếp <ArrowRight size={16} /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
