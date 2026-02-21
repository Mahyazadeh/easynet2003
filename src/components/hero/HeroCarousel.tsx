'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { HeroImage } from '@/payload-types'
import styles from './Hero.module.scss'

interface HeroCarouselProps {
  items: HeroImage[]
}

const durations = [2500, 5000, 5000]

export default function HeroCarousel({ items }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
  if (items.length <= 1) return

  let intervalId: NodeJS.Timeout

  const startInterval = () => {
    const duration = durations[currentIndex] ?? 2500
    intervalId = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % items.length
        // We clear & restart interval with new duration
        clearInterval(intervalId)
        startInterval()
        return next
      })
    }, duration)
  }

  startInterval()

  return () => clearInterval(intervalId)
}, [currentIndex, items.length])

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

        </>
      )}
    </section>
  )
}
