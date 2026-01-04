"use client";

import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
} from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FiExternalLink, FiGithub } from "react-icons/fi";

/* =======================
   TYPES
======================= */

type TechItem = {
  name: string;
  logo?: string;
  icon?: React.FC<{ className?: string }>;
};

type DockItemData = {
  icon: React.ReactNode;
  label: string;
};

type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

/* =======================
   DOCK (NO LAYOUT SHIFT)
======================= */

function DockItem({
  children,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (x) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return x - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      className="
        group relative inline-flex items-center justify-center
        rounded-full bg-[#060010]
        border border-neutral-700 shadow-md
      "
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(child as any, { isHovered })
          : child
      )}
    </motion.div>
  );
}

function DockLabel({
  children,
  isHovered,
}: {
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    return isHovered.on("change", (v) => setVisible(v === 1));
  }, [isHovered]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
            absolute -top-6 left-1/2 -translate-x-1/2
            rounded-md border border-neutral-700
            bg-[#060010] px-2 py-0.5
            text-xs text-white whitespace-nowrap
          "
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 68,
  distance = 160,
  panelHeight = 64,
  baseItemSize = 48,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="relative w-full flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`
          pointer-events-auto
          absolute bottom-0
          flex items-end gap-4
          rounded-2xl border border-neutral-700
          px-4 pb-2 ${className}
        `}
        style={{ height: panelHeight }}
      >
        {items.map((item, i) => (
          <DockItem
            key={i}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

/* =======================
   PROJECT MODAL
======================= */

export default function ProjectModal({
  selected,
  onClose,
}: {
  selected: {
    name: string;
    category: string;
    desc: string;
    tech: TechItem[];
    image?: string;
    demo?: string;
    link?: string;
  } | null;
  onClose: () => void;
}) {
  if (!selected) return null;

  const dockItems: DockItemData[] = selected.tech.map((t) => ({
    icon: t.icon ? (
      <t.icon className="w-7 h-7 group-hover:scale-110 transition-transform" />
    ) : (
      <img
        src={t.logo}
        alt={t.name}
        className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
      />
    ),
    label: t.name,
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="
            relative w-full max-w-6xl max-h-[90vh] overflow-y-auto
            rounded-3xl bg-white/95 dark:bg-neutral-950/95
            border border-neutral-200/50 dark:border-neutral-800/50
            shadow-2xl
          "
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 100, scale: 0.9, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 100, scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="
              absolute top-6 right-6 z-50 p-3 rounded-full
              bg-neutral-100 dark:bg-neutral-800
              hover:rotate-90 transition
            "
          >
            <RxCross2 />
          </button>

          {/* Content */}
          <div className="p-10 space-y-10">
            <div className="flex justify-center">
              <span
                className="
                px-4 py-1.5 text-xs font-bold uppercase rounded-full
                bg-[var(--primary)]/10 text-[var(--primary)]
                border border-[var(--primary)]/20
              "
              >
                {selected.category}
              </span>
            </div>

            <h2 className="text-center text-4xl font-bold">{selected.name}</h2>

            {/* Tech Dock */}
            <div className="relative h-[140px] flex justify-center">
              <Dock
                items={dockItems}
                className="bg-[#060010]/80 backdrop-blur-xl"
              />
            </div>

            <p className="max-w-3xl mx-auto text-center text-neutral-600 dark:text-neutral-400">
              {selected.desc}
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              {selected.demo && (
                <a
                  href={selected.demo}
                  target="_blank"
                  className="
                    px-8 py-4 bg-[var(--primary)] text-white
                    rounded-xl flex items-center gap-2
                    hover:-translate-y-1 transition
                  "
                >
                  Visit Website <FiExternalLink />
                </a>
              )}
              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  className="
                    px-8 py-4 bg-neutral-100 dark:bg-neutral-800
                    rounded-xl flex items-center gap-2
                    hover:-translate-y-1 transition
                  "
                >
                  <FiGithub /> View Code
                </a>
              )}
            </div>

            {/* Preview Image */}
            {selected.image && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="
                  mt-6 overflow-hidden rounded-2xl
                  border border-neutral-200/50 dark:border-neutral-800/50
                  shadow-xl
                "
              >
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full max-h-[480px] object-cover object-top"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
