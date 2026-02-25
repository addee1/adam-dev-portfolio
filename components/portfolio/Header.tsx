'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, type ThemeName } from './ThemeContext';
import styles from '@/styles/header.module.scss';

const themes: { name: ThemeName; label: string; color: string }[] = [
  { name: 'dark', label: 'Dark', color: '#1a1d27' },
  { name: 'light', label: 'Light', color: '#f8f9fc' },
  { name: 'dark-green', label: 'Dark Green', color: '#12231a' },
  { name: 'dark-blue', label: 'Dark Blue', color: '#111832' },
];

const navItems = ['About', 'Projects', 'Skills', 'Contact'];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setThemeOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function scrollTo(section: string) {
    const el = document.getElementById(section.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logo}>
          {'<'}
          <span>Dev</span>
          {' />'}
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item}
              className={styles.navLink}
              onClick={() => scrollTo(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className={styles.rightSection}>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <button
              className={styles.themeToggle}
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="Change theme"
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </button>
            {themeOpen && (
              <div className={styles.themeMenu}>
                {themes.map((t) => (
                  <button
                    key={t.name}
                    className={`${styles.themeOption} ${theme === t.name ? styles.active : ''}`}
                    onClick={() => {
                      setTheme(t.name);
                      setThemeOpen(false);
                    }}
                    type="button"
                  >
                    <span
                      className={styles.dot}
                      style={{ background: t.color, border: '1px solid rgba(255,255,255,0.2)' }}
                    />
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav className={`${styles.mobileNav} ${mobileOpen ? styles.open : ''}`} aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button
            key={item}
            className={styles.mobileNavLink}
            onClick={() => scrollTo(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </header>
  );
}
