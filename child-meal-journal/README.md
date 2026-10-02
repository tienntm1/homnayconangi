# Bữa Ăn Của Con (Child Meal Journal)

Đây là ứng dụng nhật ký ăn uống của con, được phát triển dựa trên yêu cầu PRD.

## Công nghệ sử dụng
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: SQLite (thông qua thư viện `better-sqlite3`)
- **Icons**: Lucide React

## Cách chạy dự án

1. **Cài đặt thư viện**:
   ```bash
   npm install
   ```

2. **Khởi tạo dữ liệu demo**:
   ```bash
   node scripts/seed.js
   ```

3. **Chạy server phát triển**:
   ```bash
   npm run dev
   ```

4. **Sử dụng**:
   Mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

## Hướng dẫn đưa lên GitHub

Bạn có thể chạy các lệnh sau trong thư mục này để tạo và đẩy source code lên GitHub:

```bash
# Khởi tạo git
git init

# Thêm file bỏ qua
echo "node_modules/" > .gitignore
echo ".next/" >> .gitignore
echo "meals.db" >> .gitignore
echo "meals.db-journal" >> .gitignore
echo "meals.db-wal" >> .gitignore
echo "meals.db-shm" >> .gitignore

# Commit mã nguồn
git add .
git commit -m "Initial commit - Vibecode assessment"

# Liên kết với repo GitHub (thay URL bằng repo của bạn)
git branch -M main
git remote add origin https://github.com/Tên-Tài-Khoản/Ten-Repo.git
git push -u origin main
```
