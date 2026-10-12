'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-pink-100 max-w-md w-full">
        <div className="text-4xl mb-4">🍼</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đã có lỗi xảy ra</h2>
        <p className="text-gray-500 mb-6 text-sm">Hệ thống đang tạm thời gián đoạn. Mẹ vui lòng bấm thử lại hoặc quay lại trang chủ.</p>
        <button
          onClick={() => reset()}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md transition-all"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
