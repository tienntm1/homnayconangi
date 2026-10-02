import Link from 'next/link';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <Utensils size={24} />
          Bữa Ăn Của Con
        </Link>
        <Link href="/history" className="text-sm underline underline-offset-2">
          Lịch sử
        </Link>
      </div>
    </header>
  );
}
