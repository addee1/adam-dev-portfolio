'use client';

import { useState, useRef, useEffect } from 'react';
import { skills, type Skill } from './data';
import styles from '@/styles/skills.module.scss';

type Category = 'all' | 'language' | 'framework' | 'tool' | 'database';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'language', label: 'Languages' },
  { value: 'framework', label: 'Frameworks' },
  { value: 'tool', label: 'Tools' },
  { value: 'database', label: 'Databases' },
];

function SkillCard({ skill, animated }: { skill: Skill; animated: boolean }) {
  const Icon = skill.icon;
  return (
    <div className={`${styles.skillCard} ${animated ? styles.animated : ''}`}>
      <div className={styles.skillHeader}>
        <div className={styles.skillName}>
          <span className={styles.skillIcon}>
            <Icon size={22}/>
          </span>
          {skill.name}
        </div>
        <span className={styles.skillCategory}>{skill.category}</span>
      </div>
      <div className={styles.bars}>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Experience</span>
          <div className={styles.barTrack}>
            <div
              className={`${styles.barFill} ${styles.experience}`}
              style={{ '--fill-width': `${skill.experience}%` } as React.CSSProperties}
            />
          </div>
          <span className={styles.barValue}>{skill.experience}%</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Usage</span>
          <div className={styles.barTrack}>
            <div
              className={`${styles.barFill} ${styles.usage}`}
              style={{ '--fill-width': `${skill.usage}%` } as React.CSSProperties}
            />
          </div>
          <span className={styles.barValue}>{skill.usage}%</span>
        </div>
        <div className={styles.barRow}>
          <span className={styles.barLabel}>Enjoyment</span>
          <div className={styles.barTrack}>
            <div
              className={`${styles.barFill} ${styles.enjoyment}`}
              style={{ '--fill-width': `${skill.enjoyment}%` } as React.CSSProperties}
            />
          </div>
          <span className={styles.barValue}>{skill.enjoyment}%</span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter((s) => s.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset animation on filter change so bars animate again
  useEffect(() => {
    setAnimated(false);
    const timer = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  return (
    <section className={styles.section} id="skills" ref={sectionRef}>
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>
          Skills & <span>Expertise</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Technologies I work with, rated by experience, usage, and enjoyment
        </p>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              className={`${styles.filterBtn} ${activeFilter === cat.value ? styles.active : ''}`}
              onClick={() => setActiveFilter(cat.value)}
              type="button"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.experience}`} />
            Experience
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.usage}`} />
            Usage
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.enjoyment}`} />
            Enjoyment
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} animated={animated} />
          ))}
        </div>
      </div>
    </section>
  );
}
