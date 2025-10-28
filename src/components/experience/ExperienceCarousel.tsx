'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import type { Experience } from '@/payload-types'
import styles from './Experience.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ExperienceCarouselProps {
  sections: NonNullable<Experience['sections']>
}

export default function ExperienceCarousel({ sections }: ExperienceCarouselProps) {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    arrows: false,
    dots: false,
    swipeToSlide: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          centerPadding: '0px',
          variableWidth: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
          variableWidth: false,
          arrows: false,
        },
      },
    ],
  }

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {sections.map((section, index) => {
          const media = typeof section.image === 'object' ? section.image : null

          return (
            <div key={section.id || index} className={styles.slideWrapper}>
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
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
