// src/data/projectData.ts

export interface Project {
  id: number;
  image: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean; // Trường để phân biệt nổi bật hay bình thường
  reverse?: boolean; // Chỉ dùng cho featured projects
}

export const projects: Project[] = [
  {
    id: 1,
    image: "portfolio.png",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/DuyPhatpeo/portfolio",
    demo: "https://tranduyphat.vercel.app/",
    featured: true,
    reverse: false,
  },
  {
    id: 2,
    image: "ecommerce.png",
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
  {
    id: 4,
    image: "weather-app.png",
    tags: ["React 18", "TypeScript", "Tailwind CSS", "Zustand"],
    github: "https://github.com/DuyPhatpeo/weather-app",
    demo: "https://weather-app-phat.vercel.app/",
    featured: true,
    reverse: false,
  },

  // Other Projects
  {
    id: 9,
    image: "pokedex.png",
    tags: ["React Native", "Expo", "TypeScript", "NativeWind", "Zustand"],
    github: "https://github.com/DuyPhatpeo/pokedex",
    demo: null,
    featured: false,
  },
  {
    id: 3,
    image: "restaurant.png",
    tags: ["React", "Vite", "Firebase", "Axios"],
    github: "https://github.com/DuyPhatpeo/restaurant",
    demo: "https://restaurant-phat.vercel.app/",
    featured: false,
  },
  {
    id: 5,
    image: "dinomovies.png",
    tags: ["React", "Vite", "Tailwind CSS", "Axios", "React Router"],
    github: "https://github.com/DuyPhatpeo/simple-movies",
    demo: "https://dinomovie.vercel.app",
    featured: false,
  },
  {
    id: 6,
    image: "dinostore.png",
    tags: ["React", "Vite", "Axios", "React Router"],
    github: "https://github.com/DuyPhatpeo/dinostore",
    demo: "https://dinostorevn.vercel.app/",
    featured: false,
  },
  {
    id: 7,
    image: "dinobotweb.png",
    tags: ["Node.js", "Discord.js"],
    github: "https://github.com/DuyPhatpeo/DinoBotDiscord",
    demo: "https://dinobotvn.vercel.app/",
    featured: false,
  },
  {
    id: 8,
    image: "shopfstyle.png",
    tags: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/DuyPhatpeo/ShopFSTYLE",
    demo: "",
    featured: false,
  },
];
