import Link from 'next/link';
import { BookHeart, ArrowRight } from 'lucide-react';
import { getAllArticles } from '@/lib/actions';

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/handbooks/${article.id}`} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-20 h-20 shrink-0 bg-blue-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
              {article.icon}
            </div>
            <div>
              <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1 block">{article.category}</span>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors leading-tight">{article.title}</h2>
              <p className="text-gray-500 text-sm font-medium mb-3 line-clamp-2">{article.summary}</p>
              <div className="text-blue-500 text-sm font-bold flex items-center gap-1">Đọc tiếp <ArrowRight size={16} /></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
