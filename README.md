# Portfolio - DINO PÉO

<div align="center">
  <img src="public/portfolio.png" alt="Portfolio Preview" width="800" />
</div>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.3.5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-12.23.24-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"></a>
  <a href="https://zustand-demo.pmnd.rs/"><img src="https://img.shields.io/badge/Zustand-5.0.8-FF4154?style=for-the-badge&logo=react&logoColor=white" alt="Zustand"></a>
</p>

> Một trang web portfolio cá nhân đầy ấn tượng với hiệu suất cao, mang đậm phong cách **Dark Sci-Fi / Cyber**. Giao diện được thiết kế mô phỏng màn hình HUD (Heads-Up Display) và trạm dữ liệu tương lai, kết hợp với kiến trúc Feature-Driven hiện đại giúp dễ dàng mở rộng và bảo trì.

## ✨ Tính năng Nổi bật & Giao diện

- 🕶️ **Chế độ Tối (Pure Black):** Nền đen chuẩn OLED `#000000` tạo chiều sâu tối đa.
- 🌌 **Bầu trời sao vũ trụ:** Hiệu ứng nền vũ trụ sống động với các vì sao, tinh vân và sao băng ở chế độ Dark Mode.
- 📐 **Giao diện HUD Terminal:** Các khối hình học, hiệu ứng kính mờ (glassmorphism) và các điểm nhấn công nghệ hiện đại.
- 🌍 **Đa ngôn ngữ (i18n):** Tích hợp sẵn hỗ trợ nhiều ngôn ngữ với `react-i18next`.
- 🌓 **Chế độ Sáng (Cyber Light):** Giao diện sáng đầy tính công nghệ với sự tương phản giữa Deep Slate và Vibrant Teal (`#0D9488`).
- ⚡ **Hiệu suất Tối đa:** Xây dựng trên Vite + React 19, sử dụng Framer Motion cho các hoạt ảnh mượt mà đạt 60fps.
- 🏗️ **Kiến trúc Feature-Driven:** Cấu trúc module rõ ràng, áp dụng nguyên tắc Screaming Architecture giúp dễ dàng mở rộng frontend.

## 🛠️ Kiến trúc & Công nghệ (Tech Stack)

- **Core Frontend:** React 19 (Function Components, Hooks)
- **Ngôn ngữ:** TypeScript 5.8 (Strict Typing)
- **Trình đóng gói (Build Tool):** Vite 6
- **CSS / Styling:** Tailwind CSS + PostCSS + CSS Variables (Hỗ trợ Global Theming)
- **Animation:** Framer Motion
- **Quản lý State:** Zustand (Theme, Language, App State)
- **Routing:** React Router v7
- **UI Components & Icons:** Lucide React, React Icons, React Toastify

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

### Yêu cầu hệ thống

Đảm bảo bạn đã cài đặt các công cụ sau:

- [Node.js](https://nodejs.org/) (Phiên bản v18.0.0 trở lên)
- Trình quản lý gói: `npm`, `yarn`, hoặc `bun`.

### Các bước Cài đặt

1. Clone kho lưu trữ (repository) về máy:

```bash
git clone https://github.com/DuyPhatpeo/portfolio.git
cd portfolio
```

1. Cài đặt các thư viện phụ thuộc:

```bash
npm install
```

1. Khởi chạy Server Development (Cyber Terminal):

```bash
npm run dev
```

1. Truy cập giao diện tại: `http://localhost:5173`

## 📂 Cấu trúc Thư mục

```text
portfolio/
├── public/                 # Các tệp tĩnh & Hình ảnh OpenGraph
├── src/
│   ├── assets/             # Hình ảnh, SVGs, media cục bộ
│   ├── components/         # Các UI Components dùng chung (Buttons, Cards, UI)
│   ├── constants/          # Dữ liệu tĩnh và cấu hình
│   ├── features/           # Các tính năng chính (Hero, About, Project, v.v.)
│   ├── hooks/              # Custom React Hooks
│   ├── i18n/               # Cấu hình đa ngôn ngữ
│   ├── layouts/            # Layout trang và các thành phần cấu trúc
│   ├── routes/             # Cấu hình Routing của ứng dụng
│   ├── stores/             # Quản lý state toàn cục với Zustand
│   ├── styles/             # Kiến trúc CSS Global & Theme Tokens
│   ├── types/              # Định nghĩa kiểu dữ liệu TypeScript (Global TS Types)
│   ├── App.tsx             # Cấu trúc gốc của ứng dụng (Root Component)
│   └── main.tsx            # Điểm render vào DOM
├── index.html              # HTML Shell
└── vite.config.ts          # Cấu hình Vite Bundler
```

## 🎨 Hướng dẫn Tùy chỉnh (Customizing)

Hệ thống được thiết kế theo dạng module độc lập (Highly modular). Để tùy chỉnh portfolio thành của riêng bạn:

1. **Thay đổi Thông tin Cá nhân:** Chỉnh sửa các file cấu hình trong `src/constants/` (hoặc dữ liệu hiển thị trong `src/features/`).
2. **Cấu hình Ngôn ngữ:** Cập nhật hoặc thêm ngôn ngữ mới tại `src/i18n/`.
3. **Thay đổi Giao diện (Theme):** Chỉnh sửa các giá trị CSS Custom Properties trong thư mục `src/styles/` để thay đổi màu nhấn neon chủ đạo.

## 🚀 Triển khai (Deployment)

### CI/CD với GitHub Actions

Dự án đã được cấu hình sẵn GitHub workflow (`.github/workflows/node.js.yml`) để tự động kiểm tra code (lint) và build dự án mỗi khi có push lên nhánh `main` hoặc tạo Pull Requests.

### Github Pages

1. Cập nhật đường dẫn `base` trong file `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/portfolio/", // Tên repository của bạn
  // ...
});
```

1. Chạy lệnh build:

```bash
npm run build
```

### Vercel / Netlify

Kiến trúc dự án hoàn toàn tương thích với môi trường serverless. Bạn chỉ cần liên kết repository GitHub với Vercel hoặc Netlify, thiết lập command build là `npm run build` và thư mục output là `dist`. Hệ thống sẽ tự động deploy sau mỗi lần commit.

## 👨‍💻 Tác giả

**DINO PÉO**

- GitHub: [@DuyPhatpeo](https://github.com/DuyPhatpeo)

---

<div align="center">
  <p>Engineered with 🩻 by DINO PÉO</p>
  <p>Nếu kiến trúc hệ thống này giúp ích cho bạn, hãy để lại một ⭐ cho repository nhé!</p>
</div>
