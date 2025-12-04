import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function ProjectModal({ selected, onClose }: any) {
  return (
    <AnimatePresence>
      {" "}
      {selected && (
        <motion.div
          className=" fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 dark:bg-black/20  opacity px-4 "
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {" "}
          <motion.div
            className=" relative w-full max-w-5xl bg-white dark:bg-[#0a0a0a] border border-black/20 dark:border-white/10 rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto "
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {" "}
            {/* Close Button */}{" "}
            <button
              className=" absolute top-6 right-6 z-30 p-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors "
              onClick={onClose}
            >
              {" "}
              <RxCross2 className="w-6 h-6" />{" "}
            </button>{" "}
            {/* Content */}{" "}
            <div className="p-12 space-y-10">
              {" "}
              {/* Title */}{" "}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {" "}
                <h2 className="text-5xl font-bold text-black dark:text-white mb-2">
                  {" "}
                  {selected.name}{" "}
                </h2>{" "}
              </motion.div>{" "}
              {/* Tech Stack Icons */}{" "}
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {" "}
                <div className=" flex gap-4 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-black/10 dark:border-white/5 p-4 ">
                  {" "}
                  {selected.tech.map((t: any, i: number) => {
                    const name = typeof t === "string" ? t : t.name;
                    const logo = typeof t === "string" ? null : t.logo;
                    return (
                      <motion.div
                        key={i}
                        className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        whileHover={{ y: -4 }}
                      >
                        {" "}
                        {logo ? (
                          <img
                            src={logo}
                            alt={name}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-black/70 dark:text-white/70">
                            {" "}
                            {name.substring(0, 2).toUpperCase()}{" "}
                          </span>
                        )}{" "}
                      </motion.div>
                    );
                  })}{" "}
                </div>{" "}
              </motion.div>{" "}
              {/* Description */}{" "}
              <motion.div
                className="max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {" "}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base text-center">
                  {" "}
                  {selected.desc}{" "}
                </p>{" "}
              </motion.div>{" "}
              {/* Action Buttons */}{" "}
              <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {" "}
                {selected.demo && (
                  <a
                    href={selected.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" flex items-center gap-2 px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg hover:bg-black/80 dark:hover:bg-gray-200 transition-colors "
                  >
                    {" "}
                    <span>Visit Website</span>{" "}
                    <FiExternalLink className="w-4 h-4" />{" "}
                  </a>
                )}{" "}
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-[#1a1a1a] text-black dark:text-white font-medium rounded-lg border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors "
                >
                  {" "}
                  <span>Github</span> <FiGithub className="w-4 h-4" />{" "}
                </a>{" "}
              </motion.div>{" "}
              {/* Screenshot */}{" "}
              {selected.image && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {" "}
                  <div className=" bg-gray-100 dark:bg-[#1a1a1a] rounded-lg border border-black/10 dark:border-white/10 p-4 ">
                    {" "}
                    <img
                      src={selected.image}
                      alt={selected.name}
                      className="w-full rounded-lg"
                    />{" "}
                  </div>{" "}
                </motion.div>
              )}{" "}
            </div>{" "}
          </motion.div>{" "}
        </motion.div>
      )}{" "}
    </AnimatePresence>
  );
}
