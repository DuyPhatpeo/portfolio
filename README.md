# 🌌 Dark Sci-Fi Portfolio - DINO PÉO

<div align="center">
  <img src="public/portfolio.png" alt="Portfolio Preview" width="800" />
</div>

<p align="center">
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-11.5.4-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"></a>
</p>

> A visually striking, high-performance personal portfolio website engineered with a premium **Dark Sci-Fi / Cyber** aesthetic. Designed to resemble an advanced Heads-Up Display (HUD) and futuristic data terminal.

## ✨ Key Features & Aesthetic

- 🕶️ **Pure Black Dark Mode:** High-contrast OLED-ready `#000000` dark mode background for maximum depth.
- 🟢 **Neon Xanh Ngọc (Turquoise) Synergy:** Distinctive bright turquoise accents mixed with deep slate/blacks.
- 📐 **HUD Terminal UI:** Geometric elements, angular container clip-paths (`polygon`), and raw console-style aesthetics throughout the structural layout.
- 🕹️ **Interactive Particle System:** Dynamic floating canvas particles with circuit lines that match the currently selected theme.
- 🌓 **Cyber Light Mode:** A fully supported contrasting bright tech theme with Deep Slate and Vibrant Teal (`#0D9488`).
- ⚡ **Maximum Performance:** Built on Vite + React 18, utilizing Framer Motion for buttery-smooth 60fps animations.

## 🛠️ Architecture & Tech Stack

- **Frontend Core:** React 18 (Function Components, Hooks)
- **Language:** TypeScript (Strict Typing)
- **Build Tool:** Vite (ESBuild ecosystem)
- **Styling:** Tailwind CSS + Native CSS Variables for global theming
- **Animation Engine:** Framer Motion
- **Icons:** React Icons + DevIcons (SVG)
- **State Pattern:** Top-level Context / Zustand (for toggles)

## 🚀 Quick Start

### Prerequisites

Ensure you have installed:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm, yarn, or bun.

### Installation & Run

1. Clone the repository:

```bash
git clone https://github.com/DuyPhatpeo/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Initialize the Cyber Terminal (Start Dev Server):

```bash
npm run dev
```

4. Access the interface at `http://localhost:5173`.

## 📂 System File Hierarchy

```
portfolio/
├── public/                 # Static assets & OpenGraph Images
├── src/
│   ├── components/         # Modular Interface Modules
│   │   ├── about/          # Biographical Data Modules
│   │   ├── contact/        # Comm-Link Forms & HUD Cards
│   │   ├── general/        # Header, Footer, Navigation Systems
│   │   ├── hero/           # Primary Landing Interface
│   │   ├── project/        # Holographic Portfolio Logs
│   │   ├── skills/         # Technical Skill HUD Nodes
│   │   └── theme/          # Particle Systems & Theme Toggles
│   ├── data/               # Unified Configuration Data (JSON-like TS)
│   ├── styles/             # Global CSS Architecture & Theme Tokens
│   ├── App.tsx             # Root Application Assembly
│   └── main.tsx            # DOM Render Entry
├── index.html              # HTML Shell
├── tailwind.config.cjs     # Tailwind Configuration & Theme Extensions
└── vite.config.ts          # Vite Bundler Settings
```

## 🎨 Customizing the Terminal

The system is highly modular. To adapt the portfolio for your own identity:

1. **Identity Injection:** Edit the configuration models inside `src/data/` (`heroData.ts`, `aboutData.ts`, `skillsData.tsx`).
2. **Theme Recalibration:** Modify the CSS Custom Properties found in `src/styles/abstract/variables.css` to change the core neon accent colors.
3. **Database Population:** Append your professional history and repositories to `src/data/projectData.tsx`.

## 🚀 Deployment Protocol

### GitHub Pages

1. Update `base` path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: "/portfolio/", // Your repository name
  // ...
});
```

2. Execute build & deploy sequence:

```bash
npm run build
npm run deploy
```

### Vercel / Netlify

The architecture is inherently serverless-ready. Link your GitHub repository to Vercel or Netlify, specify `npm run build` as the build command, and `dist` as the output directory. The system will deploy automatically upon commit.

## 👨‍💻 Operator

**DINO PÉO**

- GitHub: [@DuyPhatpeo](https://github.com/DuyPhatpeo)

---

<div align="center">
  <p>Engineered with 🩻 by DINO PÉO</p>
  <p>If this system architecture assists your development, initialize a ⭐ on the repository.</p>
</div>
