'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from '@/styles/eastereggs.module.scss';

// ========================================
// 1. Cat that chases the mouse cursor
// ========================================
function ChaseCat({
  enabled,
  onCaught,
}: {
  enabled: boolean;
  onCaught: () => void;
}) {
  const catRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -200, y: -200 });
  const catPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const caughtRef = useRef(false);
  const facingRef = useRef<'left' | 'right'>('right');

  useEffect(() => {
    if (!enabled) {
      caughtRef.current = false;
      cancelAnimationFrame(rafRef.current);
      return;
    }

    function onMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
    }
    window.addEventListener('mousemove', onMouseMove);

    function animate() {
      const dx = mousePos.current.x - catPos.current.x;
      const dy = mousePos.current.y - catPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const speed = 0.035;
      catPos.current.x += dx * speed;
      catPos.current.y += dy * speed;

      if (dx < -2) facingRef.current = 'left';
      else if (dx > 2) facingRef.current = 'right';

      if (catRef.current) {
        catRef.current.style.left = `${catPos.current.x - 16}px`;
        catRef.current.style.top = `${catPos.current.y - 16}px`;
        catRef.current.style.transform =
          facingRef.current === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
      }

      if (dist < 18 && !caughtRef.current) {
        caughtRef.current = true;
        onCaught();
        return;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, onCaught]);

  if (!enabled) return null;

  return (
    <div ref={catRef} className={styles.cat} aria-hidden="true">
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ears */}
        <polygon points="14,8 8,26 22,22" fill="var(--accent)" opacity="0.85" />
        <polygon points="50,8 56,26 42,22" fill="var(--accent)" opacity="0.85" />
        <polygon points="16,12 11,24 21,21" fill="var(--bg-secondary)" />
        <polygon points="48,12 53,24 43,21" fill="var(--bg-secondary)" />
        {/* Head */}
        <ellipse cx="32" cy="34" rx="20" ry="18" fill="var(--accent)" opacity="0.9" />
        {/* Eyes */}
        <ellipse cx="24" cy="31" rx="3.5" ry="4.5" fill="var(--bg-primary)" />
        <ellipse cx="40" cy="31" rx="3.5" ry="4.5" fill="var(--bg-primary)" />
        <ellipse cx="24" cy="32" rx="2" ry="3" fill="var(--bg-primary)" />
        <ellipse cx="40" cy="32" rx="2" ry="3" fill="var(--bg-primary)" />
        <circle cx="24.5" cy="31" r="1.5" fill="var(--text-primary)" />
        <circle cx="40.5" cy="31" r="1.5" fill="var(--text-primary)" />
        {/* Nose */}
        <polygon points="32,36 30,38 34,38" fill="var(--bg-primary)" />
        {/* Mouth */}
        <path
          d="M30 39 Q32 42 34 39"
          stroke="var(--bg-primary)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Whiskers */}
        <line x1="10" y1="34" x2="22" y2="36" stroke="var(--bg-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="38" x2="22" y2="38" stroke="var(--bg-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="42" y1="36" x2="54" y2="34" stroke="var(--bg-primary)" strokeWidth="1" opacity="0.6" />
        <line x1="42" y1="38" x2="54" y2="38" stroke="var(--bg-primary)" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
}

// Cat Caught Modal
function CatCaughtModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.catModalOverlay} onClick={onClose}>
      <div
        className={styles.catModal}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.catModalClose}
          onClick={onClose}
          type="button"
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.catModalEmoji}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="14,8 8,26 22,22" fill="var(--accent)" opacity="0.85" />
            <polygon points="50,8 56,26 42,22" fill="var(--accent)" opacity="0.85" />
            <ellipse cx="32" cy="34" rx="20" ry="18" fill="var(--accent)" opacity="0.9" />
            <ellipse cx="24" cy="31" rx="3.5" ry="4.5" fill="var(--bg-primary)" />
            <ellipse cx="40" cy="31" rx="3.5" ry="4.5" fill="var(--bg-primary)" />
            <circle cx="24.5" cy="31" r="1.5" fill="var(--text-primary)" />
            <circle cx="40.5" cy="31" r="1.5" fill="var(--text-primary)" />
            <polygon points="32,36 30,38 34,38" fill="var(--bg-primary)" />
            <path d="M28 39 Q32 44 36 39" stroke="var(--bg-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
        <h3 className={styles.catModalTitle}>Mmmm yummie!</h3>
        <p className={styles.catModalText}>You got eaten by the cat.</p>
      </div>
    </div>
  );
}

// ========================================
// 2. Wand Cursor with sparkle trail
// ========================================
interface Sparkle {
  id: number;
  x: number;
  y: number;
}

function WandCursor({ enabled }: { enabled: boolean }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const lastSparkle = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    function onMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastSparkle.current < 60) return;
      lastSparkle.current = now;

      const id = ++idRef.current;
      const offsetX = (Math.random() - 0.5) * 16;
      const offsetY = (Math.random() - 0.5) * 16;

      setSparkles((prev) => [
        ...prev.slice(-12),
        { id, x: e.clientX + offsetX, y: e.clientY + offsetY },
      ]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 600);
    }

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style>{`* { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364ffda' stroke-width='1.5'%3E%3Cpath d='m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z'/%3E%3Cpath d='m14 7 3 3'/%3E%3C/svg%3E") 2 22, auto !important; }`}</style>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className={styles.sparkle}
          style={{ left: s.x, top: s.y }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10">
            <circle cx="5" cy="5" r="2" fill="var(--accent)" opacity="0.9" />
          </svg>
        </div>
      ))}
    </>
  );
}

// ========================================
// 3. Konami Code
// ========================================
function KonamiCode({ onActivate }: { onActivate: () => void }) {
  const sequenceRef = useRef<string[]>([]);
  const konamiSequence = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      sequenceRef.current.push(e.key);
      if (sequenceRef.current.length > 10) {
        sequenceRef.current = sequenceRef.current.slice(-10);
      }
      if (sequenceRef.current.length === 10) {
        const matches = sequenceRef.current.every(
          (key, i) => key.toLowerCase() === konamiSequence[i].toLowerCase()
        );
        if (matches) {
          onActivate();
          sequenceRef.current = [];
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onActivate]);

  return null;
}

function KonamiOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.konamiOverlay}>
      <h2 className={styles.konamiTitle}>ACHIEVEMENT UNLOCKED</h2>
      <p className={styles.konamiSubtitle}>
        You found the Konami Code! You are a true gamer.
      </p>
      <button className={styles.konamiClose} onClick={onClose} type="button">
        Nice!
      </button>
    </div>
  );
}

// ========================================
// 4. Matrix Rain
// ========================================
function MatrixRain({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 255, 65, 0.7)';
      ctx.font = '14px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    function onResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className={styles.matrixCanvas}
        aria-hidden="true"
      />
      <div className={styles.matrixHint}>
        type <span>matrix</span> again to turn it off
      </div>
    </>
  );
}

// ========================================
// Gamepad FAB + Panel
// ========================================
export default function EasterEggs() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [catEnabled, setCatEnabled] = useState(false);
  const [wandEnabled, setWandEnabled] = useState(false);
  const [konamiShown, setKonamiShown] = useState(false);
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const [catCaught, setCatCaught] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setPanelOpen(false);
      }
    }
    if (panelOpen) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [panelOpen]);

  // Listen for "matrix" typed to toggle
  useEffect(() => {
    let typed = '';
    function onKeyDown(e: KeyboardEvent) {
      if (e.key.length === 1) {
        typed += e.key.toLowerCase();
        if (typed.length > 10) typed = typed.slice(-10);
        if (typed.endsWith('matrix')) {
          setMatrixEnabled((prev) => !prev);
          typed = '';
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleKonami = useCallback(() => {
    setKonamiShown(true);
  }, []);

  const handleCatCaught = useCallback(() => {
    setCatCaught(true);
    setCatEnabled(false);
  }, []);

  function closeCatModal() {
    setCatCaught(false);
  }

  return (
    <>
      {/* Active easter eggs */}
      <ChaseCat enabled={catEnabled} onCaught={handleCatCaught} />
      <WandCursor enabled={wandEnabled} />
      <KonamiCode onActivate={handleKonami} />
      <MatrixRain enabled={matrixEnabled} />

      {catCaught && <CatCaughtModal onClose={closeCatModal} />}
      {konamiShown && (
        <KonamiOverlay onClose={() => setKonamiShown(false)} />
      )}

      {/* Gamepad FAB */}
      <div ref={panelRef} className={styles.fabContainer}>
        {panelOpen && (
          <div className={styles.eggPanel}>
            {/* Cursor Cat */}
            <button
              className={styles.eggItem}
              onClick={() => setCatEnabled((p) => !p)}
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 64 64"
                fill="none"
              >
                <polygon
                  points="14,8 8,26 22,22"
                  fill="currentColor"
                  opacity="0.85"
                />
                <polygon
                  points="50,8 56,26 42,22"
                  fill="currentColor"
                  opacity="0.85"
                />
                <ellipse
                  cx="32"
                  cy="34"
                  rx="20"
                  ry="18"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle cx="24" cy="30" r="2.5" fill="var(--bg-secondary)" />
                <circle cx="40" cy="30" r="2.5" fill="var(--bg-secondary)" />
              </svg>
              <span className={styles.eggLabel}>Cursor Cat</span>
              <span
                className={`${styles.eggDot} ${catEnabled ? styles.active : ''}`}
              />
            </button>

            {/* Wand Cursor */}
            <button
              className={styles.eggItem}
              onClick={() => setWandEnabled((p) => !p)}
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 00-1.72 0L2.36 18.64a1.21 1.21 0 000 1.72l1.28 1.28a1.2 1.2 0 001.72 0L21.64 5.36a1.2 1.2 0 000-1.72z" />
                <path d="m14 7 3 3" />
                <path d="M5 6v4" />
                <path d="M19 14v4" />
                <path d="M10 2v2" />
                <path d="M7 8H3" />
                <path d="M21 16h-4" />
                <path d="M11 3H9" />
              </svg>
              <span className={styles.eggLabel}>Wand Cursor</span>
              <span
                className={`${styles.eggDot} ${wandEnabled ? styles.active : ''}`}
              />
            </button>

            {/* Konami hint */}
            <div className={styles.eggHint}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 10h0M10 10h0M14 10h0M18 10h0M8 14h8" />
              </svg>
              <span className={styles.eggHintLabel}>Secret</span>
              <span className={styles.eggHintValue}>
                {'^ ^ v v'}
              </span>
            </div>

            {/* Matrix hint */}
            <div className={styles.eggHint}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
              <span className={styles.eggHintLabel}>Code</span>
              <span className={styles.eggHintValue}>...</span>
            </div>
          </div>
        )}

        <button
          className={styles.fabBtn}
          onClick={() => setPanelOpen((p) => !p)}
          aria-label="Easter eggs menu"
          type="button"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="8" cy="12" r="1.5" fill="currentColor" />
            <circle cx="16" cy="12" r="1.5" fill="currentColor" />
            <rect
              x="11"
              y="10"
              width="2"
              height="4"
              rx="0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
