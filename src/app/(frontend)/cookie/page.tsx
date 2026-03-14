import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { parseFormattedText } from '@/lib/textFormatting'
import { cache } from 'react'
import { COMPANY_NAME } from '../page'


const getPagina = cache(async () => {
  try {
    const payloadConfig = await config    
    const payload = await getPayload({ config: payloadConfig })
    
    const res = await payload.find({
    collection: 'simple-page',
    where: {
      title: {
        equals: 'Informativa per l’uso dei cookies sul sito EASY NET',
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
      {pagina && (
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <h1 className="mb-4">{pagina.title}</h1>
              {pagina.description && (
                <div className="simple-page-description">
                  {parseFormattedText(pagina.description)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
