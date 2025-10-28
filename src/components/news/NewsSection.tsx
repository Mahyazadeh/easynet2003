import { News } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { parseFormattedText } from '@/lib/textFormatting'
import styles from './News.module.scss'

interface NewsSectionProps {
  newsItems: News[]
}

export default function NewsSection({ newsItems }: NewsSectionProps) {
  for (const item of newsItems) {
    console.log(item)
  }

  return (
    <section className={styles.news}>
      <div className="container">
        <div className="row mb-2">
          <div className="col-12 d-flex justify-content-center flex-column align-items-center">
            <h2 className={styles.sectionTitle}>NEWS</h2>
            <p className={styles.sectionSub}>
              Resta aggiornato sulle ultime novità in ambito digitale
            </p>
          </div>
        </div>
      </div>
      <div className={styles.newsScrollWrapper}>
        <div className={styles.newsScroll}>
          {newsItems.map((item) => {
            return (
              <article key={item.id} className={styles.newsCard}>
                {item.link ? (
                  <Link
                    href={item.link}
                    className={styles.newsCardLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Background image */}
                    {item.image && typeof item.image === 'object' && (
                      <div
                        className={styles.newsBackground}
                        style={{ backgroundImage: `url(${item.image.url})` }}
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className={`${styles.newsOverlay} ${styles.newsGradient}`} />

                    {/* Content */}
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{parseFormattedText(item.title || '')}</h3>
                      {item.content && (
                        <p className={styles.newsExcerpt}>{parseFormattedText(item.content)}</p>
                      )}
                      <div className={styles.newsLink}>
                        <span>Leggi</span>
                        <Image
                          src="/media/arrow_right.svg"
                          alt="Arrow right"
                          width={16}
                          height={16}
                          className={styles.newsArrow}
                        />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <>
                    {/* Background image */}
                    {item.image && typeof item.image === 'object' && (
                      <div
                        className={styles.newsBackground}
                        style={{ backgroundImage: `url(${item.image.url})` }}
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className={`${styles.newsOverlay} ${styles.newsGradient}`} />

                    {/* Content */}
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{parseFormattedText(item.title || '')}</h3>
                      {item.content && (
                        <p className={styles.newsExcerpt}>{parseFormattedText(item.content)}</p>
                      )}
                    </div>
                  </>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
