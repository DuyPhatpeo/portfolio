'use client';

import React, { useState, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';

import './BubbleMenu.css';

export interface BubbleMenuItemHoverStyles {
  bgColor?: string;
  textColor?: string;
}

export interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: BubbleMenuItemHoverStyles;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface BubbleMenuProps {
  logo?: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: BubbleMenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  rightControls?: ReactNode;
  desktopOnly?: boolean;
}

const DEFAULT_ITEMS: BubbleMenuItem[] = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Projects',
    rotation: 4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -4,
    hoverStyles: { bgColor: '#d9ff3a', textColor: '#11121c' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#fff',
  menuContentColor = '#111',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  rightControls,
  desktopOnly = false
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = [
    'bubble-menu',
    useFixedPosition ? 'fixed' : 'absolute',
    desktopOnly ? 'hidden md:flex' : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
    onMenuClick?.(false);
  };

  // Keyboard navigation: Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when overlay is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter((b): b is HTMLAnchorElement => Boolean(b));
    const labels = labelRefs.current.filter((l): l is HTMLSpanElement => Boolean(l));

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);

      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 900;
      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        const rot = isDesktop ? (item?.rotation ?? 0) : 0;
        gsap.set(bubble, { scale: 0, rotation: rot, transformOrigin: '50% 50%' });
      });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
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
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
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
        const bubbles = bubblesRef.current.filter((b): b is HTMLAnchorElement => Boolean(b));
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
          <span className="logo-content">
            {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {rightControls}

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </div>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          onClick={handleBackdropClick}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'} ${
            desktopOnly ? 'hidden md:flex' : ''
          }`}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className="pill-list"
            data-count={menuItems.length}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  onClick={e => {
                    item.onClick?.(e);
                    handleClose();
                  }}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={
                    {
                      '--item-rot': `${item.rotation ?? 0}deg`,
                      '--pill-bg': menuBg,
                      '--pill-color': menuContentColor,
                      '--hover-bg': item.hoverStyles?.bgColor || '#d9ff3a',
                      '--hover-color': item.hoverStyles?.textColor || '#11121c'
                    } as CSSProperties
                  }
                  ref={el => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
