// src/data/projectData.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean; // Trường để phân biệt nổi bật hay bình thường
  reverse?: boolean; // Chỉ dùng cho featured projects
}

export const projects: Project[] = [
  // Featured Projects
  {
    id: 1,
    title: "Personal Portfolio",
    description:
      "My personal portfolio website built with React, TypeScript, and Vite. Showcasing selected projects, technical skills, and my journey as a frontend developer with a clean, modern, and responsive design.",
    image: "public/portfolio.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/DuyPhatpeo/portfolio",
    demo: "https://tranduyphat.vercel.app/",
    featured: true,
    reverse: false,
  },
  {
    id: 2,
    title: "E-commerce Website",
    description:
      "A full-featured e-commerce web application built with React and TypeScript. The project implements core shopping flows including authentication, product listing and search, cart management, checkout, order history, and user profile management, all wrapped in a modern, responsive UI.",
    image: "public/ecommerce.png",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Firebase",
      "Zustand",
    ],
    github: "https://github.com/DuyPhatpeo/ecommerce",
    demo: "https://ecommerce-phat.vercel.app/",
    featured: true,
    reverse: true,
  },

  // Other Projects
  {
    id: 3,
    title: "Restaurant Website",
    description:
      "A modern restaurant website built with React and Vite. The project features online table reservations, dynamic menu management, blog and gallery pages, Firebase integration for authentication and storage, and a simulated REST API using JSON Server, all presented in a responsive and smooth UI.",
    image: "public/restaurant.png",
    tags: ["React", "Vite", "Firebase", "Axios"],
    github: "https://github.com/DuyPhatpeo/restaurant",
    demo: "https://restaurant-phat.vercel.app/",
    featured: false,
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description:
      "A modern weather forecast application built with React, TypeScript, and Tailwind CSS. The app supports city search and geolocation, displays detailed current weather, hourly forecasts, and multi-day forecasts, with a clean, responsive UI and lightweight state management using Zustand.",
    image: "public/weather-app.png",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Weather API"],
    github: "https://github.com/DuyPhatpeo/weather-app",
    demo: "https://weather-app-phat.vercel.app/",
    featured: false,
  },
  {
    id: 5,
    title: "Dino Movies",
    description:
      "A simple movie discovery web application built with React and Vite. The app allows users to browse a list of movies and view detailed information for each title, featuring a clean, responsive UI and fast development setup with hot reload.",
    image: "public/dino-movies.png",
    tags: ["React", "Vite", "Movie App", "Responsive UI", "Vercel"],
    github: "https://github.com/DuyPhatpeo/simple-movies",
    demo: "https://dinomovie.vercel.app",
    featured: false,
  },

  {
    id: 6,
    title: "DinoStore",
    description:
      "DinoStore is a modern e-commerce web application built with React and Vite, offering an end-to-end online shopping experience. It includes home banners, featured products, detailed product pages, user authentication, cart and wishlist functionality, product filtering, pagination, and a fully responsive UI optimized for all devices.",
    image: "public/dinostore.png",
    tags: ["React", "Vite", "Axios", "React Router"],
    github: "https://github.com/DuyPhatpeo/dinostore",
    demo: "https://dinostorevn.vercel.app/",
    featured: false,
  },
  {
    id: 7,
    title: "DinoBot Discord",
    description:
      "A multifunctional Discord bot built with Node.js and Discord.js to support server moderation and automation. It includes moderation commands like kick, ban, and mute, and is designed for flexible deployment with uptime monitoring to keep it running reliably 24/7.",
    image: "public/dinobot-discord.png",
    tags: ["Node.js", "Discord.js"],
    github: "https://github.com/DuyPhatpeo/DinoBotDiscord",
    demo: "https://dinobotvn.vercel.app/",
    featured: false,
  },

  {
    id: 8,
    title: "ShopFSTYLE – Fashion E-commerce System",
    description:
      "A full-featured fashion e-commerce website developed as a graduation project. The system includes customer and admin modules, supporting product management with color-size variants, inventory tracking, order processing, user roles, dashboards, and sales statistics. Built with a custom PHP backend, MySQL database, and a responsive frontend focused on real-world business workflows.",
    image: "public/shopfstyle.png",
    tags: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/DuyPhatpeo/ShopFSTYLE",
    demo: "",
    featured: false,
  },
];
