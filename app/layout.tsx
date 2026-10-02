import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const nunito = Nunito({ 
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Mẹ & Bé Yêu - Cẩm Nang Chăm Sóc Bé",
  description: "Nền tảng đa năng chăm sóc bé yêu toàn diện",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${nunito.className} bg-[#fff5f7] min-h-screen text-gray-800 selection:bg-pink-200 selection:text-pink-900`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
