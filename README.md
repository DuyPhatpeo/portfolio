# 🚀 Personal Portfolio

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)

> A modern, responsive portfolio website built with React, TypeScript, and Vite. Showcasing my skills, projects, and professional journey as a developer.

## ✨ Features

- 🎨 **Modern Design** - Clean and professional UI/UX
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **Type-Safe** - Written in TypeScript for better code quality
- 🔥 **Hot Module Replacement** - Instant updates during development
- 🎭 **Smooth Animations** - Engaging user interactions
- 📧 **Contact Form** - Easy way to get in touch
- 🌐 **SEO Optimized** - Better search engine visibility

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 / Styled Components
- **Code Quality:** ESLint
- **Version Control:** Git & GitHub

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/DuyPhatpeo/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🏗️ Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Entry point
├── .eslintrc.cjs       # ESLint configuration
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project dependencies
```

## 🎨 Customization

You can customize this portfolio by:

1. **Update Personal Information:** Edit the content in `src/data/` files
2. **Change Theme:** Modify colors in `src/styles/theme.ts`
3. **Add Projects:** Add your projects to `src/data/projects.ts`
4. **Update Skills:** Edit skills in `src/data/skills.ts`

## 🚀 Deployment

### GitHub Pages

1. Update `vite.config.ts` with your repo name:
```typescript
export default defineConfig({
  base: '/portfolio/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

### Vercel / Netlify

Simply connect your GitHub repository and these platforms will automatically build and deploy your site.

## 📝 ESLint Configuration

For production applications, consider enabling type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // or use strictTypeChecked for stricter rules
    ...tseslint.configs.strictTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/DuyPhatpeo/portfolio/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**DuyPhatpeo**

- GitHub: [@DuyPhatpeo](https://github.com/DuyPhatpeo)
- Portfolio: [https://duyphatpeo.github.io/portfolio](https://duyphatpeo.github.io/portfolio)

## 🙏 Acknowledgments

- Design inspiration from various portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

---

<div align="center">
  <p>Made with ❤️ by DuyPhatpeo</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
