const Footer = () => {
  return (
    <footer
      className="relative z-10 py-6 text-center text-sm text-gray-600 dark:text-gray-300 
      bg-gradient-to-r from-white/20 to-white/5 dark:from-gray-800/30 dark:to-gray-900/10
      backdrop-blur-md rounded-t-2xl border-t border-gray-200/20 dark:border-gray-700/30
      shadow-inner"
    >
      <p className="transition-colors duration-300 hover:text-orange-500">
        © {new Date().getFullYear()} Dino Péo. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
