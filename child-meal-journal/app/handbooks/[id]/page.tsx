import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getArticleById } from '@/lib/actions';
import Markdown from 'react-markdown';

export const dynamic = 'force-dynamic';

export default async function HandbookDetailPage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="pb-8 max-w-3xl mx-auto">
      <Link href="/handbooks" className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-500 hover:text-blue-500 shadow-sm border border-gray-100 transition-colors">
        <ChevronLeft size={18} /> Quay lại cẩm nang
      </Link>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-12 text-center border-b border-blue-100">
          <div className="text-6xl mb-6">{article.icon}</div>
          <span className="inline-block px-4 py-1.5 bg-blue-200/50 text-blue-700 font-bold text-sm rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800 leading-tight mb-4">{article.title}</h1>
          <p className="text-blue-800/80 font-medium text-lg max-w-xl mx-auto leading-relaxed">{article.summary}</p>
        </div>
        
        <div className="p-8 sm:p-12 prose prose-lg prose-blue max-w-none text-gray-700">
          <Markdown>{article.content}</Markdown>
        </div>
      </div>
    </div>
  );
}
