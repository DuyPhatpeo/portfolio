import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

// Start fetching just before the section reaches the viewport.
export default function DeferredSection({ children, minHeight = 600, id }: { children: ReactNode; minHeight?: number; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setReady(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const placeholder = <div style={{ minHeight }} aria-hidden="true" />;
  return <div ref={ref} id={id}><Suspense fallback={placeholder}>{ready ? children : placeholder}</Suspense></div>;
}
