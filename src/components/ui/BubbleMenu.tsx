'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@lib/gsap';

export type BubbleMenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  number?: string;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
  onClick?: (e: React.MouseEvent) => void;
};

export type BubbleMenuProps = {
  logo?: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  accentColor?: string;
  useFixedPosition?: boolean;
  items?: BubbleMenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  isOpen?: boolean;
  onClose?: () => void;
  rightControls?: ReactNode;
  activeHref?: string;
};

const DEFAULT_ITEMS: BubbleMenuItem[] = [
  {
    label: 'Home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'About',
    href: '#',
    ariaLabel: 'About',
    rotation: 3,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'Projects',
    href: '#',
    ariaLabel: 'Projects',
    rotation: -3,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'Contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: 4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = 'rgba(18, 18, 22, 0.85)',
  menuContentColor = '#f4f4f5',
  accentColor = '#d9ff3a',
  useFixedPosition = true,
  items,
  animationEase = 'back.out(1.4)',
  animationDuration = 0.5,
  staggerDelay = 0.08,
  isOpen: controlledIsOpen,
  onClose,
  rightControls,
  activeHref
}: BubbleMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const isMenuOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const containerClassName = [
    'bubble-menu',
    useFixedPosition ? 'fixed' : 'absolute',
    'left-0 right-0 top-4 sm:top-6',
    'flex items-center justify-between',
    'gap-3 sm:gap-4 px-4 sm:px-6 md:px-8',
    'pointer-events-none',
    'z-[1001]',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(nextState);
    }
    onMenuClick?.(nextState);
    if (!nextState) onClose?.();
  };

  useEffect(() => {
    if (isMenuOpen) setShowOverlay(true);
  }, [isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, autoAlpha: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          autoAlpha: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            '-=' + animationDuration * 0.8
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 20,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        autoAlpha: 0,
        duration: 0.24,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.05);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
            box-shadow: 0 0 30px rgba(217, 255, 58, 0.35) !important;
          }
          .bubble-menu-items .pill-link:hover .pill-number {
            color: var(--hover-color) !important;
            opacity: 0.85;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(0.96);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 100px;
            align-items: center;
          }
          .bubble-menu-items .pill-list {
            row-gap: 14px;
          }
          .bubble-menu-items .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.4rem, 6vw, 2.4rem);
            padding: 1.25rem 1.5rem !important;
            min-height: 64px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.03);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(0.96);
          }
        }
      `}</style>

      <nav className={containerClassName} style={style} aria-label="Main navigation">
        {/* Left Bubble: Brand Logo */}
        <div
          className="bubble logo-bubble inline-flex items-center justify-center rounded-full bg-card/80 backdrop-blur-xl border border-primary/25 shadow-[0_4px_24px_rgba(0,0,0,0.4)] pointer-events-auto h-11 sm:h-13 px-4 sm:px-6 gap-2.5 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(217, 255, 58,0.25)] will-change-transform"
          aria-label="Logo"
          style={{ background: menuBg }}
        >
          {typeof logo === 'string' ? (
            <img src={logo} alt="Logo" className="max-h-[60%] max-w-full object-contain block" />
          ) : (
            logo
          )}
        </div>

        {/* Right Bubble: Controls + Toggle Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {rightControls}

          <button
            type="button"
            className={[
              'bubble toggle-bubble menu-btn',
              isMenuOpen ? 'open' : '',
              'inline-flex flex-col items-center justify-center',
              'rounded-full',
              'backdrop-blur-xl',
              'border border-primary/25',
              'shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
              'pointer-events-auto',
              'w-11 h-11 sm:w-13 sm:h-13',
              'cursor-pointer p-0',
              'transition-all duration-300',
              'hover:border-primary/60 hover:shadow-[0_0_20px_rgba(217, 255, 58,0.25)]',
              'will-change-transform'
            ].join(' ')}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span
              className="menu-line block mx-auto rounded-[2px]"
              style={{
                width: 20,
                height: 2,
                background: isMenuOpen ? accentColor : menuContentColor,
                transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
              }}
            />
            <span
              className="menu-line short block mx-auto rounded-[2px]"
              style={{
                marginTop: '6px',
                width: 20,
                height: 2,
                background: isMenuOpen ? accentColor : menuContentColor,
                transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
              }}
            />
          </button>
        </div>
      </nav>

      {/* Bubble Menu Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            'bubble-menu-items',
            useFixedPosition ? 'fixed' : 'absolute',
            'inset-0',
            'flex items-center justify-center',
            'pointer-events-none',
            'z-[1000]'
          ].join(' ')}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className="pill-list list-none m-0 px-4 sm:px-8 w-full max-w-[1200px] mx-auto flex flex-wrap justify-center gap-3 sm:gap-4 pointer-events-auto"
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => {
              const isActive = activeHref ? activeHref === item.href : false;
              return (
                <li
                  key={idx}
                  role="none"
                  className="pill-col flex justify-center items-stretch flex-1 min-w-[240px] max-w-[360px] box-border"
                >
                  <a
                    role="menuitem"
                    href={item.href}
                    onClick={item.onClick}
                    aria-label={item.ariaLabel || item.label}
                    className={[
                      'pill-link',
                      'w-full',
                      'rounded-full',
                      'no-underline',
                      'backdrop-blur-xl',
                      'border',
                      isActive ? 'border-primary ring-1 ring-primary/40' : 'border-primary/20',
                      'shadow-[0_10px_30px_rgba(0,0,0,0.4)]',
                      'flex items-center justify-between px-7 py-5 sm:py-6',
                      'relative',
                      'transition-all duration-300 ease-out',
                      'box-border',
                      'whitespace-nowrap overflow-hidden'
                    ].join(' ')}
                    style={
                      {
                        ['--item-rot']: `${item.rotation ?? 0}deg`,
                        ['--pill-bg']: isActive ? 'rgba(217, 255, 58, 0.12)' : menuBg,
                        ['--pill-color']: isActive ? accentColor : menuContentColor,
                        ['--hover-bg']: item.hoverStyles?.bgColor || accentColor,
                        ['--hover-color']: item.hoverStyles?.textColor || '#11121c',
                        background: 'var(--pill-bg)',
                        color: 'var(--pill-color)',
                        minHeight: '84px',
                        fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                        fontWeight: 600,
                        lineHeight: 1,
                        willChange: 'transform'
                      } as CSSProperties
                    }
                    ref={el => {
                      if (el) bubblesRef.current[idx] = el;
                    }}
                  >
                    <span
                      className="pill-label inline-flex items-center gap-3"
                      style={{ willChange: 'transform, opacity' }}
                      ref={el => {
                        if (el) labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>

                    {item.number && (
                      <span
                        className="pill-number font-mono text-xs sm:text-sm font-normal tracking-wider opacity-60 transition-colors"
                        style={{ color: isActive ? accentColor : 'inherit' }}
                      >
                        {item.number}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
