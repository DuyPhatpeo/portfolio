const Footer = () => {
  return (
    <footer
      className="
        relative z-10 py-6 text-center text-sm
        text-black dark:text-white
        bg-transparent backdrop-blur-lg
        border-t-2 border-white/20 dark:border-black/20
        transition-colors
      "
    >
      <p className="hover:text-primary transition-colors duration-300">
        © {new Date().getFullYear()} Dino Péo. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
