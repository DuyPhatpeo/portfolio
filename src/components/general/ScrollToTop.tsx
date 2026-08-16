import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className=" fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-2xl p-3 bg-primary text-primary-foreground shadow-lg transition-all duration-200 hover:scale-110 hover:opacity-90 active:scale-95"
    >
      <FaArrowUp className="text-lg text-white" />
    </button>
  );
};

export default ScrollToTop;
