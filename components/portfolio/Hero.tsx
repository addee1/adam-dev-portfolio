'use client';

import { useState, useEffect, useRef } from 'react';
import { socialLinks } from './data';
import styles from '@/styles/hero.module.scss';

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    default:
      return null;
  }
}

const codeLines = [
  'const developer = {',
  '  name: "Adam Ottosson",',
  '  role: "System developer",',
  '  skills: ["C#", "Java",',
  '           "React", "Blazor"],',
  '  passion: "Turning ideas into reality,',
  '  coffee: false,',
  '  redbull: true',
  '};',
  '',
  'function buildAwesome(idea) {',
  '  const { skills, passion } = developer;',
  '  return skills.reduce((product, s) =>',
  '    product.enhance(s), idea',
  '  ).shipIt(passion);',
  '}',
];

function CodeTerminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const termRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= codeLines.length) return;

    const line = codeLines[currentLine];

    if (currentChar <= line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLine] = line.slice(0, currentChar);
          return updated;
        });
        setCurrentChar((c) => c + 1);
      }, 30 + Math.random() * 30);
      return () => clearTimeout(timer);
    } else {
      // Move to next line
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setDisplayedLines((prev) => [...prev, '']);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (termRef.current) {
      termRef.current.scrollTop = termRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalBar}>
        <span className={styles.terminalDot} data-color="red" />
        <span className={styles.terminalDot} data-color="yellow" />
        <span className={styles.terminalDot} data-color="green" />
        <span className={styles.terminalTitle}>developer.ts</span>
      </div>
      <div className={styles.terminalBody} ref={termRef}>
        {displayedLines.map((line, i) => (
          <div key={i} className={styles.codeLine}>
            <span className={styles.lineNumber}>{i + 1}</span>
            <span className={styles.codeText}>
              {colorizeCode(line)}
              {i === currentLine && currentLine < codeLines.length && (
                <span className={`${styles.cursor} ${showCursor ? styles.visible : ''}`}>|</span>
              )}
            </span>
          </div>
        ))}
        {currentLine >= codeLines.length && (
          <div className={styles.codeLine}>
            <span className={styles.lineNumber}>{codeLines.length + 1}</span>
            <span className={styles.codeText}>
              <span className={`${styles.cursor} ${showCursor ? styles.visible : ''}`}>|</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function colorizeCode(text: string) {
  // Simple syntax highlighting
  const parts: Array<{ text: string; className: string }> = [];
  let remaining = text;

  const patterns: Array<{ regex: RegExp; className: string }> = [
    { regex: /^(const|function|return|let|var)\b/, className: styles.keyword || 'keyword' },
    { regex: /^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/, className: styles.string || 'string' },
    { regex: /^(true|false|null|undefined)\b/, className: styles.boolean || 'boolean' },
    { regex: /^(\/\/.*)/, className: styles.comment || 'comment' },
    { regex: /^(\{|\}|\(|\)|\[|\]|=>|;|,|\.|\:)/, className: styles.punctuation || 'punctuation' },
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match) {
        parts.push({ text: match[0], className: pattern.className });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Find next special char or end
      const next = remaining.search(/const|function|return|let|var|["']|true|false|null|undefined|\/\/|[\{\}\(\)\[\]=>;\,\.\:]/);
      if (next > 0) {
        parts.push({ text: remaining.slice(0, next), className: '' });
        remaining = remaining.slice(next);
      } else {
        parts.push({ text: remaining, className: '' });
        remaining = '';
      }
    }
  }

  return parts.map((part, i) =>
    part.className ? (
      <span key={i} className={part.className}>{part.text}</span>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

export default function Hero() {
  function scrollTo(section: string) {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={styles.hero} id="about">
      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <span className={styles.greeting}>Hello, I am</span>
          <h1 className={styles.name}>Adam Ottosson</h1>
          <p className={styles.title}>Certified .NET Developer | Java Developer Student</p>
          <p className={styles.description}>
            I enjoy building well-structured applications — from backend APIs and databases to complete full-stack solutions.
            My focus is clean code, clear architecture, and building software that is practical and reliable.
          </p>
          <div className={styles.heroCta}>
            <button
              className={styles.ctaPrimary}
              onClick={() => scrollTo('projects')}
              type="button">
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => scrollTo('contact')}
              type="button">
              Get in Touch
            </button>
          </div>
          <div className={styles.socials}>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}>
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <CodeTerminal />
        </div>
      </div>
    </section>
  );
}
