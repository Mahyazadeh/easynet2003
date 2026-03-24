import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
import Image from 'next/image'
import { cache } from 'react'
import { COMPANY_NAME } from '../page'

export const revalidate = 60;

const getPagina = cache(async () => {
  try {
    const payloadConfig = await config    
    const payload = await getPayload({ config: payloadConfig })
    
    const res = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'Parita di genere',
      },
    },
    depth: 1,
    limit: 1,
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
  const pagina = await getPagina()

  return (
    <div className="easynet2003-page background-image">
      {pagina && <GeneralSection item={pagina} />}
      <div className="container links-container">
        <a href="/media/docs/locandina-parita-genere.pdf" target="_blank">
          Locandina contributo Regione Lazio
        </a>
        <a href="/media/docs/easynet-parita-genere.pdf" target="_blank">
          Certificazione
        </a>
          <Image src='/media/loghi-contributo-impresa-rosa.png' className='parita-genere-image' width={600} height={200} alt='loghi'/>
      </div>
    </div>
  )
}
