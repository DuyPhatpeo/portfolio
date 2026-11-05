# 🪐 Modern Developer Portfolio — Dino Péo

<div align="center">

  [![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://tranduyphat.vercel.app/)

  <p align="center">
    <strong>Báo cáo Kỹ thuật & Tài liệu Dự án Portfolio Cá nhân</strong>
  </p>

  <p align="center">
    <a href="https://tranduyphat.vercel.app/" target="_blank">🌐 Trải nghiệm Trực tiếp (Live Demo)</a>
    •
    <a href="https://github.com/DuyPhatpeo/portfolio" target="_blank">📦 Kho lưu trữ GitHub</a>
    •
    <a href="https://www.linkedin.com/in/tranduyphat/" target="_blank">💼 Kết nối LinkedIn</a>
  </p>

</div>

---

## 📑 Báo Cáo Tổng Quan Dự Án (Executive Summary)

Dự án **Portfolio Cá nhân** được nghiên cứu và phát triển nhằm mục tiêu xây dựng một nền tảng kỹ thuật số toàn diện, thể hiện năng lực chuyên môn, tư duy giải pháp và các sản phẩm công nghệ nổi bật của kỹ sư phần mềm **Trần Duy Phát (Dino Péo)**.

Phiên bản hiện tại đã được tái cấu trúc và nâng cấp toàn diện từ kiến trúc SPA truyền thống sang nền tảng **Next.js 16 (App Router)** kết hợp cùng **React 19** và hệ sinh thái thư viện hiện đại. Sự chuyển đổi này giúp tối ưu hóa đáng kể tốc độ kết xuất dữ liệu (Server-Side Rendering & Client-Side Hydration), củng cố khả năng định tuyến đa ngôn ngữ chuẩn SEO (`/[lang]`), nâng cao trải nghiệm thị giác tương tác (Interactive UI) và duy trì tính ổn định của hệ thống.

---

## 🎯 Mục Tiêu Phát Triển (Project Objectives)

1. **Hiển thị năng lực chuyên nghiệp**: Hệ thống hóa kinh nghiệm làm việc, kỹ năng lập trình (Front-end, Back-end, Tools & Cloud) và các dự án tiêu biểu một cách trực quan, khoa học.
2. **Tối ưu hóa hiệu năng & SEO**: Ứng dụng kiến trúc Next.js App Router để đạt điểm chuẩn Core Web Vitals cao, tải trang nhanh và tối ưu khả năng tìm kiếm (Metadata & OpenGraph linh hoạt theo ngôn ngữ).
3. **Trải nghiệm người dùng tương tác cao (Rich UX)**: Kết hợp hoạt ảnh mượt mà với **GSAP**, **Framer Motion** và đồ họa 3D **Three.js** mà vẫn duy trì tải trang ổn định, không gây giật lag (frame drop).
4. **Giao tiếp & Kết nối hai chiều**: Tích hợp luồng gửi phản hồi/liên hệ thời gian thực thông qua dịch vụ **EmailJS** kèm cơ chế xác thực dữ liệu chặt chẽ (**Zod Schema**).

---

## 🏗️ Kiến Trúc Hệ Thống & Công Nghệ Cốt Lõi (Tech Stack)

### 1. Kiến trúc Nền tảng (Core Framework)
* **Framework**: [Next.js](https://nextjs.org/) (Phiên bản 16.4.3 - App Router architecture)
* **Thư viện nền tảng**: [React](https://react.dev/) (Phiên bản 19.1.0)
* **Ngôn ngữ**: [TypeScript](https://www.typescriptlang.org/) (Strict type safety, ESModule)
* **Kiến trúc định tuyến**: Next.js App Router với dynamic route `[lang]` phục vụ xử lý đa ngôn ngữ bản địa (Localization).

### 2. Giao diện & Đồ họa (UI, Styling & Animation)
* **Styling Engine**: [Tailwind CSS v4](https://tailwindcss.com/) & `@tailwindcss/postcss` – Kiến trúc CSS thế hệ mới với hiệu năng biên dịch cực nhanh.
* **Component Primitives**: [Radix UI](https://www.radix-ui.com/) (Dialog, Slot, Tabs, Tooltip, Label) – Đảm bảo khả năng truy cập (Accessibility - a11y) theo chuẩn WAI-ARIA.
* **Animation & Motion**:
  * [GSAP](https://gsap.com/) & `@gsap/react` – Xử lý các hoạt ảnh trình tự (sequencing) và timeline phức tạp.
  * [Framer Motion](https://www.framer.com/motion/) – Quản lý hoạt ảnh layout, micro-interactions và hiệu ứng chuyển trang mượt mà.
* **3D Visuals & Canvas**: [Three.js](https://threejs.org/) (`@types/three`) – Render các đối tượng đồ họa không gian ba chiều tương tác.
* **Biểu tượng (Iconography)**: `lucide-react`, `react-icons`.

### 3. Quản Lý Trạng Thái & Dịch Vụ Mở Rộng (State & Services)
* **State Management**: [Zustand](https://github.com/pmndrs/zustand) – Quản lý trạng thái gọn nhẹ, linh hoạt (Theme, Contact status, Navigation state).
* **Đa ngôn ngữ (i18n)**: `i18next` & `react-i18next` – Hỗ trợ chuyển đổi song ngữ mượt mà (Tiếng Việt / English).
* **Xác thực dữ liệu (Form Validation)**: `react-hook-form` kết hợp bộ chuyển đổi `@hookform/resolvers` và lược đồ xác thực `zod`.
* **Cổng liên lạc (Mail Service)**: `@emailjs/browser` – Xử lý chuyển tiếp tin nhắn liên hệ trực tiếp đến email cá nhân không cần hạ tầng backend riêng.

---

## 🌟 Báo Cáo Phân Tích Tính Năng (Key Features Breakdown)

| Phân hệ / Module | Chi tiết kỹ thuật & Tính năng giải pháp |
| :--- | :--- |
| **Hero Section & Dynamic Typing** | Giới thiệu vai trò chuyên môn với hiệu ứng gõ chữ thời gian thực, tích hợp không gian đồ họa tương tác và phím tắt điều hướng nhanh. |
| **About & Professional Journey** | Trình bày lộ trình phát triển nghề nghiệp, triết lý lập trình, liên kết tải CV trực tiếp (`TranDuyPhat_CV.pdf`). |
| **Interactive Skills Matrix** | Phân loại kỹ năng theo các nhóm độc lập (Front-end, Back-end, Database, Cloud & Tools) với hiệu ứng hover và thanh đo lường trực quan. |
| **Featured Projects Showcase** | Trưng bày các sản phẩm thực tế, hỗ trợ xem trước (preview modal), bộ lọc công nghệ, liên kết trực tiếp tới Live Demo và GitHub Repository. |
| **Validated Contact Gateway** | Biểu mẫu nhận diện và kiểm tra tính hợp lệ dữ liệu (tên, email, số điện thoại 10 số, nội dung) bằng Zod Schema trước khi gửi thông qua EmailJS. |
| **Global Localization (i18n)** | Hệ thống chuyển đổi ngôn ngữ Anh - Việt linh hoạt dựa trên URL Path dynamic routing `/[lang]` và bộ lưu trữ trạng thái người dùng. |
| **Adaptive Theme Engine** | Hỗ trợ chuyển đổi chế độ Sáng / Tối (Dark & Light Mode) mượt mà, lưu trữ tuỳ chọn theo `localStorage` và sở thích hệ thống. |

---

## 📂 Sơ Đồ Cấu Trúc Mã Nguồn (Directory Structure)

```text
portfolio/
├── .next/                   # Thư mục build output của Next.js
├── public/                  # Tài nguyên tĩnh (assets, hình ảnh, văn bản CV)
│   ├── assets/
│   │   ├── docs/            # Hồ sơ năng lực (TranDuyPhat_CV.pdf)
│   │   ├── profile/         # Hình ảnh đại diện & Hero 3D
│   │   └── projects/        # Ảnh chụp giao diện các dự án
├── src/
│   ├── app/                 # Next.js App Router (Root layout & Pages)
│   │   ├── [lang]/          # Dynamic localization router (en / vi)
│   │   │   ├── about/       # Route giới thiệu chi tiết
│   │   │   ├── contact/     # Route trang liên hệ
│   │   │   ├── projects/    # Route trang danh sách dự án
│   │   │   ├── layout.tsx   # Layout đa ngôn ngữ
│   │   │   └── page.tsx     # Trang chủ (Home Page)
│   │   ├── layout.tsx       # Root layout toàn hệ thống
│   │   └── page.tsx         # Redirector / Default entry point
│   ├── components/          # Thành phần giao diện tái sử dụng
│   │   ├── general/         # Header, Footer, Navbar, LanguageSwitcher
│   │   ├── providers/       # ThemeProvider, I18nProvider
│   │   ├── theme/           # Toggle theme components
│   │   └── ui/              # UI primitives (Buttons, Modal, Tooltips)
│   ├── constants/           # Dữ liệu tĩnh (profileData, projectData, skillsData, technologies)
│   ├── features/            # Các module chức năng độc lập theo domain
│   │   ├── about/           # Logic & giao diện phần Giới thiệu
│   │   ├── contact/         # ContactForm, validation schema, mail actions
│   │   ├── experience/      # Thống kê và kinh nghiệm
│   │   ├── hero/            # Hero section, 3D Canvas, Typing effect
│   │   ├── project/         # Danh sách và thẻ bài hiển thị dự án
│   │   └── skills/          # Bảng ma trận kỹ năng công nghệ
│   ├── hooks/               # Custom React hooks
│   ├── i18n/                # Cấu hình đa ngôn ngữ (locales, dictionaries)
│   ├── lib/                 # Tiện ích bổ trợ (utils, cn helpers)
│   ├── stores/              # Zustand state stores (contactStore, themeStore)
│   ├── styles/              # Global CSS & Tailwind layers
│   └── types/               # TypeScript interface và Type definitions
├── next.config.mjs          # Cấu hình máy chủ Next.js (Allowed Origins, Image Domains)
├── package.json             # Danh mục thư viện phụ thuộc và scripts
├── postcss.config.cjs       # Cấu hình xử lý PostCSS
├── tailwind.config.cjs      # Cấu hình mở rộng Tailwind CSS
├── tsconfig.json            # Cấu hình biên dịch TypeScript với Path Aliases
└── vercel.json              # Cấu hình quy chuẩn triển khai hạ tầng Vercel
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Vận Hành (Getting Started)

### 1. Yêu Cầu Tiên Quyết (Prerequisites)
* **Node.js**: Phiên bản `18.18.0` hoặc cao hơn (Khuyến nghị `Node.js 20 LTS` hoặc `Node.js 22 LTS`).
* **Package Manager**: `npm` (hoặc `pnpm`, `yarn`).

### 2. Thiết Lập Môi Trường (Installation)

1. **Sao chép mã nguồn:**
   ```bash
   git clone https://github.com/DuyPhatpeo/portfolio.git
   cd portfolio
   ```

2. **Cài đặt thư viện phụ thuộc:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường (`.env`):**
   Tạo tập tin `.env` tại thư mục gốc của dự án với cấu trúc mẫu:
   ```env
   # EmailJS Gateway Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

### 3. Khởi Chạy Ứng Dụng (Execution Scripts)

| Lệnh thực thi | Mô tả chức năng |
| :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển (Development Server) tại cổng mặc định `http://localhost:2003`. |
| `npm run build` | Thực hiện kiểm tra kiểu (Type check) và tối ưu hóa đóng gói bản phát hành sản phẩm (Production Build). |
| `npm run start` | Khởi chạy ứng dụng với bản đóng gói tối ưu trên môi trường Node.js (Production Server) tại cổng `2003`. |
| `npm run lint` | Chạy bộ phân tích mã nguồn tĩnh (ESLint) nhằm đảm bảo tiêu chuẩn code style và an toàn logic. |

---

## 🚀 Đóng Gói & Triển Khai (Deployment)

Dự án được tối ưu hóa tốt nhất để triển khai trên hệ sinh thái điện toán đám mây **[Vercel](https://vercel.com/)**:

1. Liên kết repository GitHub với Vercel Project Dashboard.
2. Cấu hình các biến môi trường trong phần **Environment Variables** (`NEXT_PUBLIC_EMAILJS_*`).
3. Khung cấu hình tự động nhận diện dự án **Next.js** và thiết lập lệnh build `next build`.
4. Dự án tự động kích hoạt tiến trình CI/CD mỗi khi có thay đổi trên nhánh `main`.

---

## 👨‍💻 Thông Tin Tác Giả & Liên Hệ (Author Information)

* **Họ và tên:** Trần Duy Phát (Dino Péo)
* **Chuyên môn:** Front-End Developer / Full-Stack Developer / Software Engineer
* **Website:** [tranduyphat.vercel.app](https://tranduyphat.vercel.app/)
* **GitHub:** [@DuyPhatpeo](https://github.com/DuyPhatpeo)
* **LinkedIn:** [tranduyphat](https://www.linkedin.com/in/tranduyphat/)
* **Facebook:** [DinoPeo2810](https://www.facebook.com/DinoPeo2810)

---

<div align="center">
  <sub>Bản quyền báo cáo kỹ thuật & sản phẩm thuộc về <strong>Trần Duy Phát (Dino Péo)</strong>. All rights reserved.</sub>
</div>
