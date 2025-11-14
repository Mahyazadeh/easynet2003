import Link from 'next/link'

import { News } from '@/payload-types'
import { parseFormattedText } from '@/lib/textFormatting'

import styles from './NewsCard.module.scss'
import Image from 'next/image'

interface NewsCardProps {
  item: News
}

export default function NewsCard({ item }: NewsCardProps) {
  const media = item.image && typeof item.image === 'object' ? item.image : null
  const href = item.link?.trim() || '#'
  const hasDestination = href !== '#'
  const isExternal = hasDestination && /^https?:\/\//i.test(href)

  const formattedDate =
    item.date && !Number.isNaN(Date.parse(item.date))
      ? new Intl.DateTimeFormat('it-IT', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }).format(new Date(item.date))
      : null

  const title = item.title || ''
  const content = item.content || ''

  const card = (
    <article className={styles.card}>
      {/* Image section */}
      <div className={styles.imageSection}>
        {media && media.url && (
          <div className={styles.background} style={{ backgroundImage: `url(${media.url})` }} />
        )}
      </div>

      {/* Text content section */}
      <div className={styles.textSection}>
        {formattedDate && (
          <div className={styles.meta}>
            <span>{formattedDate}</span>
          </div>
        )}

        <h3 className={styles.title}>{parseFormattedText(title)}</h3>

        {content && <p className={styles.excerpt}>{parseFormattedText(content)}</p>}

        <div className={`${styles.footer} ${!content ? styles.contentOnly : ''}`}>
          <span className={styles.readMore}>
            Leggi
            <Image src="/media/arrow_right.svg" alt="Arrow right" width={16} height={16} />
          </span>
        </div>
      </div>
    </article>
  )

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.cardLink}
        aria-label={`Leggi ${title}`}
      >
        {card}
      </a>
    )
  }

  if (hasDestination) {
    return (
      <Link href={href} className={styles.cardLink} aria-label={`Leggi ${title}`}>
        {card}
      </Link>
    )
  }

  return (
    <a className={styles.cardLink} aria-label={title} role="button" href="#">
      {card}
    </a>
  )
}
