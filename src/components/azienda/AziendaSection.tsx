import type { PageWithSection } from '@/payload-types'
import Image from 'next/image'
import { parseFormattedText } from '@/lib/textFormatting'
import styles from './Azienda.module.scss'

interface AziendaSectionProps {
  azienda: PageWithSection
}

export default function AziendaSection({ azienda }: AziendaSectionProps) {
  return (
    <section className={styles.azienda}>
      {azienda.sections && azienda.sections.length > 0 && (
        <div className={styles.sectionsWrapper}>
          {azienda.sections.map((section, index) => {
            const media = typeof section.image === 'object' ? section.image : null

            return (
              <div key={index} className={styles.section}>
                {/* Full-width image with title overlay */}
                <div className={styles.imageWrapper}>
                  {media?.url && (
                    <Image
                      src={media.url}
                      alt={media.alt || section.sectionTitle || 'Section image'}
                      fill
                      className={styles.image}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  {/* Gradient overlay for better text readability */}
                  <div className={styles.imageOverlay} />

                  {/* Title overlaid on image */}
                  {section.sectionTitle && (
                    <div className={styles.titleOverlay}>
                      <h2 className={styles.sectionTitle}>
                        {parseFormattedText(section.sectionTitle)}
                      </h2>
                    </div>
                  )}
                </div>

                {/* Content below the image */}
                {(section.sectionSubtitle || section.sectionContent) && (
                  <div className="container">
                    <div className={styles.textContent}>
                      {section.sectionSubtitle && (
                        <p className={styles.sectionSubtitle}>
                          {parseFormattedText(section.sectionSubtitle)}
                        </p>
                      )}
                      {section.sectionContent && (
                        <p className={styles.sectionContent}>
                          {parseFormattedText(section.sectionContent)}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
