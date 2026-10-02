import Link from 'next/link';
import { ChefHat } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary text-white p-4 shadow-md sticky top-0 z-10">
      <div className="max-w-md mx-auto flex justify-center items-center">
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <ChefHat size={26} />
          Món Ngon Cho Bé
        </Link>
      </div>
    </header>
  );
}
