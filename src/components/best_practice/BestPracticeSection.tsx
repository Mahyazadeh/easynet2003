import type { BestPractice } from '@/payload-types'
import Link from 'next/link'
import { parseFormattedText } from '@/lib/textFormatting'
import styles from './BestPractice.module.scss'
import type { Metadata } from 'next'

interface BestPracticeSectionProps {
  bestPractice: BestPractice
}

export async function generateMetadata({
  bestPractice,
}: BestPracticeSectionProps): Promise<Metadata> {
  return {
    title: bestPractice.title || 'EasyNet2003', 
    description: bestPractice.subtitle || 'EasyNet2003',
  }
}
export default function BestPracticeSection({ bestPractice }: BestPracticeSectionProps) {
  return (
    <section className={styles.bestPractice}>
      <div className="container">
        <div className="row mb-4">
          <div
            className={`col-12 d-flex justify-content-center flex-column align-items-center ${styles.sectionTitleWrapper}`}
          >
            <h2 className={styles.sectionTitle}>{bestPractice.title}</h2>
            {bestPractice.subtitle && (
              <p className={styles.sectionSubtitle}>{bestPractice.subtitle}</p>
            )}
          </div>
        </div>

        {bestPractice.cards && bestPractice.cards.length > 0 && (
          <div className="row g-4">
            {bestPractice.cards.map((card, index) => {
              const gradientNumber = index + 1
              const gradientPath = `/media/gradient_${gradientNumber}.svg`
              
              return (
                <div key={index} className="col-12 col-md-6 col-lg-3">
                  <Link
                    href={card.link || '#'}
                    className={styles.card}
                    rel="noopener noreferrer"
                    style={{
                      backgroundImage: `url(${gradientPath})`,
                    }}
                  >
                    <div className={styles.cardOverlay} />
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{parseFormattedText(card.title || '')}</h3>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
