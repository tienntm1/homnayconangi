'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-[#fff5f7] min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 max-w-md w-full text-center">
          <div className="text-4xl mb-4">🍼</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đã có lỗi xảy ra</h2>
          <p className="text-gray-500 mb-6 text-sm">Hệ thống đang được bảo trì. Mẹ vui lòng thử lại sau giây lát.</p>
          <button
            onClick={() => reset()}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all"
          >
            Tải lại trang
          </button>
        </div>
      </body>
    </html>
  );
}
