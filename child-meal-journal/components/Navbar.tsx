'use client';
import Link from 'next/link';
import { Baby, BookHeart, LineChart, Utensils, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: 'Thực Đơn', href: '/meals', icon: Utensils },
    { name: 'Cẩm Nang', href: '/handbooks', icon: BookHeart },
    { name: 'Phát Triển', href: '/tracker', icon: LineChart },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100 shadow-[0_4px_20px_-10px_rgba(236,72,153,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-pink-400 to-rose-400 p-2.5 rounded-2xl text-white shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform duration-300">
              <Baby size={28} />
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 tracking-tight">
              Mẹ & Bé Yêu
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 bg-pink-50/50 p-1.5 rounded-2xl border border-pink-100">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                    isActive ? 'bg-white text-pink-600 shadow-sm border border-pink-100/50' : 'text-gray-500 hover:bg-pink-100/50 hover:text-pink-600'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-pink-600 scale-110' : ''} /> {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-pink-500 bg-pink-50 rounded-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-pink-100 shadow-xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-colors ${
                  isActive ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>
                  <Icon size={20} />
                </div>
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
