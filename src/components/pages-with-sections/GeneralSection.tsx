import type { PageWithSection } from '@/payload-types'
import Image from 'next/image'
import { parseFormattedText } from '@/lib/textFormatting'
import styles from './General.module.scss'

interface GeneralSectionProps {
  item: PageWithSection,
  isLogoRankpa?: boolean ,
}

const getYouTubeEmbedUrl = (url?: string) => {
  if (!url) return null

  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
  )

  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}


export default function GeneralSection({ item, isLogoRankpa }: GeneralSectionProps) {
  return (
    <>
    <section className={styles.item}>
      {item.sections && item.sections.length > 0 && (
        <div className={styles.sectionsWrapper}>
          {item.sections.map((section, index) => {
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
                    <div className={`container ${styles.titleOverlay}`}>
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
                      {isLogoRankpa&& <Image src='/media/loghi-beneficiari-fondi-FESR.png' className='mt-5' width={600} height={200} alt='loghi'/>}                     
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}  

    </section>
      {item.videoUrl && (
      <div className={styles.videoWrapper}>
        <iframe
          src={getYouTubeEmbedUrl(item.videoUrl)!}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

)}
</>
  )
}
