import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Bữa Ăn Của Con",
  description: "Nhật ký ăn uống của con",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-50 min-h-screen pb-24`}>
        <Header />
        <main className="max-w-md mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
