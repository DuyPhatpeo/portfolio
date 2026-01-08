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
    title: "Time to Have More Fun",
    description:
      "A single page web app for helping me choose where to travel, built with Next.js, Firebase, and Tailwind CSS",
    tags: ["Next.js", "Tailwind CSS", "Firebase"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
    image: "",
  },

  {
    id: 6,
    title: "OctoProfile",
    description:
      "A nicer look at your GitHub profile and repo stats. Includes data visualizations of your top languages, starred repositories, and sort through your top repos by number of stars, forks, and size.",
    tags: ["Next.js", "Chart.js", "GitHub API"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
    image: "",
  },
  {
    id: 7,
    title: "Google Keep Clone",
    description: "A simple Google Keep clone built with Vue and Firebase.",
    tags: ["Vue", "Firebase"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
    image: "",
  },
  {
    id: 8,
    title: "Apple Music Embeddable Web Player Widget",
    description:
      "Embeddable web player widget for Apple Music that lets users log in and listen to full song playback in the browser leveraging MusicKit.js",
    tags: ["MusicKit.js", "JS", "SCSS"],
    github: "https://demo.com",
    demo: "https://demo.com",
    featured: false,
    image: "",
  },
];
