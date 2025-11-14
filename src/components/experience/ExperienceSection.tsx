'use client'

import { Experience } from '@/payload-types'
import { parseFormattedText } from '@/lib/textFormatting'
import { useIsMobile } from '@/hooks/useMediaQuery'
import ExperienceCarousel from './ExperienceCarousel'
import ExperienceGrid from './ExperienceGrid'
import styles from './Experience.module.scss'

interface ExperienceSectionProps {
  experience: Experience
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const isMobile = useIsMobile()

  return (
    <section className={styles.experience}>
      <div className="container">
        <div className="row mb-4">
          <div
            className={`col-12 d-flex justify-content-center flex-column align-items-center ${styles.titleOverlay}`}
          >
            <h2 className={styles.sectionTitle}>{parseFormattedText(experience.title || '')}</h2>
            {experience.subtitle && (
              <p className={styles.sectionSub}>{parseFormattedText(experience.subtitle)}</p>
            )}
          </div>
        </div>
      </div>

      {experience.sections && experience.sections.length > 0 && (
        <>
          {/* Conditionally render only one component based on screen size */}
          {isMobile ? (
            <ExperienceCarousel sections={experience.sections} />
          ) : (
            <ExperienceGrid sections={experience.sections} />
          )}
        </>
      )}
    </section>
  )
}
