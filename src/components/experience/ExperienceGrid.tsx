import type { Experience } from '@/payload-types'
import styles from './Experience.module.scss'
import Link from 'next/link'

interface ExperienceGridProps {
  sections: NonNullable<Experience['sections']>
}

export default function ExperienceGrid({ sections }: ExperienceGridProps) {
  return (
    <div className={styles.gridContainer}>
      <div className="container">
        <div className={styles.gridWrapper}>
          {sections.map((section, index) => {
            const media = typeof section.image === 'object' ? section.image : null

            return (
              <div key={section.id || index} className={styles.gridCard}>
                <Link
                  href={section.link}
                  rel="noopener noreferrer">               
                <div
                  className={styles.experienceCard}
                  style={{
                    backgroundImage: media?.url ? `url(${media.url})` : undefined,
                  }}
                >
                  <div className={styles.cardOverlay} />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{section.title}</h3>
                  </div>
                </div>
                </Link> 
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
