'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { HeroImage } from '@/payload-types'
import styles from './Hero.module.scss'

interface HeroCarouselProps {
  items: HeroImage[]
}

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  return (
    <section className={styles.hero}>
      {items.map((item, index) => {
        const media = typeof item.image === 'object' ? item.image : null
        const isActive = index === currentIndex

        return (
          <div
            key={item.id}
            className={`${styles.heroSlide} ${isActive ? styles.heroSlideActive : ''}`}
          >
            {media?.url && (
              <div className={styles.heroMedia}>
                <Image
                  src={media.url}
                  alt={media.alt || item.title}
                  fill
                  priority={index === 0} // Only prioritize first image
                  className={styles.heroImage}
                  style={{ objectFit: 'cover' }}
                  sizes="100vw"
                />
              </div>
            )}

            <div className={styles.heroOverlay}>
              <div className={`container ${styles.heroContent}`}>
                <h1 className={styles.heroTitle}>{item.title}</h1>

                {item.subtitle && <div className={styles.heroSub}>{item.subtitle}</div>}

                {item.button?.text && item.button?.url && (
                  <a href={item.button.url} className={styles.heroButton}>
                    {item.button.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      })}

      {items.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`${styles.heroNav} ${styles.heroNavPrev}`}
            aria-label="Previous slide"
          >
            <Image
              src="/media/carousel_thin_left.svg"
              alt="Slide precedente"
              width={60}
              height={60}
            />
          </button>
          <button
            onClick={goToNext}
            className={`${styles.heroNav} ${styles.heroNavNext}`}
            aria-label="Next slide"
          >
            <Image
              src="/media/carousel_thin_right.svg"
              alt="Slide successiva"
              width={60}
              height={60}
            />
          </button>

          {/* <div className={styles.heroDots}>
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.heroDot} ${index === currentIndex ? styles.heroDotActive : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </>
      )}
    </section>
  )
}
