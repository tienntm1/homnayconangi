import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getArticleById } from '@/lib/actions';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function HandbookDetailPage({ params }: { params: { id: string } }) {
  const article = await getArticleById(params.id);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="pb-8 max-w-4xl mx-auto">
      <Link href="/handbooks" className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full text-sm font-bold text-gray-500 hover:text-blue-500 shadow-sm border border-gray-100 transition-colors">
        <ChevronLeft size={18} /> Quay lại cẩm nang
      </Link>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        
        {article.image_url ? (
          <div className="relative h-64 md:h-96 w-full bg-blue-50">
            <Image 
              src={article.image_url} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <span className="inline-block px-4 py-1.5 bg-blue-500/80 backdrop-blur-md text-white font-bold text-sm rounded-full mb-4 shadow-sm">
                {article.icon} {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight drop-shadow-lg">{article.title}</h1>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 sm:p-12 text-center border-b border-blue-100">
            <div className="text-6xl mb-6">{article.icon}</div>
            <span className="inline-block px-4 py-1.5 bg-blue-200/50 text-blue-700 font-bold text-sm rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-800 leading-tight mb-4">{article.title}</h1>
          </div>
        )}
        
        <div className="p-8 sm:p-12">
          {article.image_url && (
            <p className="text-blue-800/80 font-medium text-lg md:text-xl leading-relaxed mb-8 border-l-4 border-blue-400 pl-4 bg-blue-50/50 p-4 rounded-r-2xl">
              {article.summary}
            </p>
          )}

          <div className="prose prose-lg prose-blue max-w-none text-gray-700 font-medium">
            <Markdown remarkPlugins={[remarkGfm]}>{article.content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}
