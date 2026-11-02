"use client";

import React, { useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: {
  children: React.ReactNode;
  itemClassName?: string;
}) => <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardTopsRef = useRef<number[]>([]);
  const endElementTopRef = useRef<number>(0);
  const containerHeightRef = useRef<number>(0);
  const lastTransformsRef = useRef(
    new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>(),
  );

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    if (end <= start) return scrollTop >= start ? 1 : 0;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  // Layout-based offset (offsetTop walked up the offsetParent chain), never
  // getBoundingClientRect(): that reflects the element's post-transform visual position.
  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (!useWindowScroll) return element.offsetTop;
      let top = 0;
      let node: HTMLElement | null = element;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    },
    [useWindowScroll],
  );

  // Measure once on mount and on resize, keeping scroll event handling pure read-write decoupled
  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;
    if (!cards.length) return;

    // Cache un-transformed layout positions to eliminate layout thrashing during scroll
    cardTopsRef.current = cards.map((card) => getElementOffset(card));

    const endElement = scroller.querySelector<HTMLElement>(".scroll-stack-end");
    endElementTopRef.current = endElement ? getElementOffset(endElement) : 0;

    containerHeightRef.current = useWindowScroll
      ? window.innerHeight
      : scroller.clientHeight;
  }, [getElementOffset, useWindowScroll]);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0,
        containerHeight: containerHeightRef.current || window.innerHeight,
      };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: containerHeightRef.current || (scroller ? scroller.clientHeight : 0),
    };
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const { scrollTop, containerHeight } = getScrollData();
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    // Mobile-optimized parameters for silky smooth inertia scrolling
    const effectiveStackDistance = isMobile ? Math.min(itemStackDistance, 18) : itemStackDistance;
    const effectiveBaseScale = isMobile ? Math.max(baseScale, 0.94) : baseScale;

    // Stabilize stack position on mobile to avoid address-bar resize jumps
    const stackPositionPx = isMobile
      ? Math.min(parsePercentage(stackPosition, containerHeight), 84)
      : parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElementTop = endElementTopRef.current;

    cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardTopsRef.current[i] ?? getElementOffset(card);
      const triggerStart = cardTop - stackPositionPx - effectiveStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = effectiveBaseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cards.length; j++) {
          const jCardTop = cardTopsRef.current[j] ?? getElementOffset(cards[j]);
          const jTriggerStart = jCardTop - stackPositionPx - effectiveStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        // Clamp to 0 to prevent negative bounce or subpixel hitching when scrolling up
        translateY = Math.max(0, scrollTop - cardTop + stackPositionPx + effectiveStackDistance * i);
      } else if (scrollTop > pinEnd) {
        translateY = Math.max(0, pinEnd - cardTop + stackPositionPx + effectiveStackDistance * i);
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) >= 0.2 ||
        (newTransform.translateY === 0 && lastTransform.translateY !== 0) ||
        Math.abs(lastTransform.scale - newTransform.scale) >= 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) >= 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) >= 0.2;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        if (newTransform.blur > 0) {
          card.style.filter = `blur(${newTransform.blur}px)`;
        } else if (card.style.filter) {
          card.style.filter = "";
        }
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset,
  ]);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  const handleResize = useCallback(() => {
    measure();
    updateCardTransforms();
  }, [measure, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const effectiveItemDistance = isMobile ? Math.min(itemDistance, 36) : itemDistance;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${effectiveItemDistance}px`;
      }
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
    });

    measure();
    updateCardTransforms();

    const scrollTarget: Window | HTMLDivElement = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });

    // Re-measure after web fonts load to prevent layout shift offset discrepancies
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        measure();
        updateCardTransforms();
      });
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(scroller);
    }

    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardTopsRef.current = [];
      lastTransformsRef.current.clear();
    };
  }, [itemDistance, useWindowScroll, handleScroll, handleResize, measure, updateCardTransforms]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? "" : "is-local-scroll"} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
