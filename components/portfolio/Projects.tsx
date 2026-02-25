'use client';

import { useState, useEffect, useCallback } from 'react';
import { projects, type Project } from './data';
import styles from '@/styles/projects.module.scss';

function PlaceholderImage({ small = false }: { small?: boolean }) {
  return (
    <div className={styles.placeholderImage}>
      {!small && (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span>No image yet</span>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      <div className={styles.cardImage}>
        {project.images.length > 0 ? (
          <img src={project.images[0]} alt={project.title} />
        ) : (
          <PlaceholderImage />
        )}
        <div className={styles.cardOverlay}>
          <span>View Details</span>
        </div>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDesc}>{project.description}</p>
        <div className={styles.cardTags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);

  // Generate placeholder image set (5 images per project)
  const imageCount = project.images.length > 0 ? project.images.length : 5;
  const images = project.images.length > 0
    ? project.images
    : Array.from({ length: imageCount }, (_, i) => `placeholder-${i}`);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className={styles.modal}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Main Image */}
        <div className={styles.modalMainImage}>
          {project.images.length > 0 ? (
            <img src={images[activeImage]} alt={`${project.title} screenshot ${activeImage + 1}`} />
          ) : (
            <PlaceholderImage />
          )}
        </div>

        {/* Thumbnail Row */}
        <div className={styles.modalThumbnails}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`${styles.thumbnail} ${i === activeImage ? styles.active : ''}`}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1}`}
              type="button"
            >
              {project.images.length > 0 ? (
                <img src={img} alt={`Thumbnail ${i + 1}`} />
              ) : (
                <div className={styles.thumbnailPlaceholder}>
                  {i + 1}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>{project.title}</h2>
          <p className={styles.modalDesc}>{project.longDescription}</p>

          <div className={styles.modalSection}>
            <h4>Languages</h4>
            <div className={styles.modalTags}>
              {project.languages.map((lang) => (
                <span key={lang} className={styles.modalTag}>{lang}</span>
              ))}
            </div>
          </div>

          <div className={styles.modalSection}>
            <h4>Frameworks</h4>
            <div className={styles.modalTags}>
              {project.frameworks.map((fw) => (
                <span key={fw} className={styles.modalTag}>{fw}</span>
              ))}
            </div>
          </div>

          <div className={styles.modalSection}>
            <h4>Tools & Technologies</h4>
            <div className={styles.modalTags}>
              {project.tools.map((tool) => (
                <span key={tool} className={styles.modalTag}>{tool}</span>
              ))}
            </div>
          </div>

          <div className={styles.modalSection}>
            <h4>Links</h4>
            <div className={styles.modalLinks}>
              {project.liveUrl && (
                <a href={project.liveUrl} className={styles.modalLink} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} className={`${styles.modalLink} ${styles.secondary}`} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className={styles.section} id="projects">
      <div className={styles.sectionInner}>
        <h2 className={styles.sectionTitle}>
          Featured <span>Projects</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          A selection of projects I have worked on
        </p>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
