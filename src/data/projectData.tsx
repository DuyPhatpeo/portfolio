// src/data/projectData.ts

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string | null;
  demo: string;
  featured: boolean; // Trường để phân biệt nổi bật hay bình thường
  reverse?: boolean; // Chỉ dùng cho featured projects
}

export const projects: Project[] = [
  // Featured Projects
  {
    id: 1,
    title: "Halcyon Theme",
    description:
      "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.LSiV2YhM-O80StIMm7HJeQHaD4?rs=1&pid=ImgDetMain",
    tags: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    reverse: false,
  },
  {
    id: 2,
    title: "Spotify Profile",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.LSiV2YhM-O80StIMm7HJeQHaD4?rs=1&pid=ImgDetMain",
    tags: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
    reverse: true,
  },

  // Other Projects
  {
    id: 3,
    title: "Integrating Algolia Search with WordPress Multisite",
    description:
      "Building a custom multisite compatible WordPress plugin to build global search with Algolia",
    tags: ["Algolia", "WordPress", "PHP"],
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
    image: "",
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
    id: 5,
    title: "Building a Headless Mobile App CMS From Scratch",
    description:
      "Find out how we built a custom headless CMS with Node, Express, and Firebase for a project at Upstatement",
    tags: ["Node", "Express", "Firebase", "Vue"],
    github: null,
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
    github: null,
    demo: "https://demo.com",
    featured: false,
    image: "",
  },
];
