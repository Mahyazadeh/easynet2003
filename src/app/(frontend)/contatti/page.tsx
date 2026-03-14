import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../../components/pages-with-sections/General.module.scss'
import { parseFormattedText } from '@/lib/textFormatting'
import { cache } from 'react'
import { COMPANY_NAME } from '../page'

export const revalidate = 3600;

const getPagina = cache(async () => {
  try {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'contact',
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
    return res.docs[0]
  } catch (err) {
    console.error('SERVER ERRORE in getPagina:', err)
    return null
  }
})

export async function generateMetadata() {
  const pagina = await getPagina()
  const baseTitle = pagina?.seo?.metaTitle || pagina?.title

  return {
    title: `${baseTitle} | ${COMPANY_NAME}`,
    description: pagina?.seo?.metaDescription || '',
  }
}

export default async function Page() {
  const contact = await getPagina()
  if (!contact) {
    return <div>Nessun contenuto contatti trovato</div>
  }
  console.log('PAGINA', contact.seo)

  const media =
    contact.image &&
    typeof contact.image === 'object' &&
    contact.image.url &&
    contact.image.width &&
    contact.image.height
      ? contact.image
      : null

  return (
    <div className="clienti-page easynet2003-page background-image">
      <div className={styles.imageWrapper}>
        {media && (
          <Image
            src={media.url!}
            alt={media.alt ?? 'Immagine di contatto'}
            fill
            className={styles.image}
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
        <div className={styles.imageOverlay} />

        {contact.title && (
          <div className={`container ${styles.titleOverlay}`}>
            <h2 className={styles.sectionTitle}>{parseFormattedText(contact.title)}</h2>
          </div>
        )}
      </div>

      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row gap-4">
          {' '}
          {/* better spacing/responsiveness */}
          <section className={`d-flex flex-column flex-grow-1 ${styles.textContent}`}>
            {contact.subtitle && (
              <p className={styles.sectionSubtitle}>{parseFormattedText(contact.subtitle)}</p>
            )}
            {contact.description && (
              <p className="mb-4">{parseFormattedText(contact.description)}</p>
            )}
            {(contact.sedeLegale?.address ||
              contact.sedeLegale?.phone1 ||
              contact.sedeLegale?.phone2 ||
              contact.sedeLegale?.email) && (
              <>
                <p className={styles.sectionSubtitle}>Sede legale e operativa</p>
                {contact.sedeLegale?.address && (
                  <div className={styles.sectionContent}>
                    {parseFormattedText(contact.sedeLegale.address)}
                  </div>
                )}
                {contact.sedeLegale?.phone1 && (
                  <div className={styles.sectionContent}>
                    {parseFormattedText(contact.sedeLegale.phone1)}
                  </div>
                )}
                {contact.sedeLegale?.phone2 && (
                  <div className={styles.sectionContent}>
                    {parseFormattedText(contact.sedeLegale.phone2)}
                  </div>
                )}
                {contact.sedeLegale?.email && (
                  <Link href={`mailto:${contact.sedeLegale.email}`} className={styles.sectionContent} >
                    {parseFormattedText(contact.sedeLegale.email)}
                  </Link>
                )}
              </>
            )}

            {contact.sedeSecondaria && contact.sedeSecondaria?.length > 0 && (
              <section className="mt-4">
                <p className={styles.sectionSubtitle}>Sedi secondarie</p>
                {contact.sedeSecondaria.map((sede, i) => (
                  <div key={i}>{sede.address && <div>{parseFormattedText(sede.address)}</div>}</div>
                ))}
              </section>
            )}
          </section>
          {/* Map – show only if address exists (or always if you prefer) */}
          
          {contact.sedeLegale?.address && (
            <div style={{ width: '100%', height: '450px', flex: '1 1 50%' }} >
              <iframe
                title="Mappa Azienda"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.123456!2d12.4657669!3d41.9299792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f60c1e5912ee7%3A0xc38d7bad517bce9c!2sVia+Guglielmo+Calderini,+68,+00196+Roma+RM!5e0!3m2!1sit!2sit!4v1700000000000!5m2!1sit!2sit"
              />
            </div>

            
          )}
        </div>
      </div>
    </div>
  )
}
