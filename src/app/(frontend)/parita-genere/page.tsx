import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
import Image from 'next/image'

export default async function Page() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'Parita di genere',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

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

        <Image
          src="/media/logo-regione-lazio.png"
          alt="Logo Regione Lazio"
          className="mt-3 parita-genere-image"
          width={200}
          height={200}
        />
        <Image
          src="/media/lazio_innova.png"
          alt="Logo Lazio Innova"
          className="parita-genere-image"
          width={150}
          height={150}
        />
        <Image
          src="/media/SMC-accredia-color.jpg"
          alt="Logo SMC Accredia"
          className="parita-genere-image"
          width={200}
          height={200}
        />
        <Image
          src="/media/logo_impresa_rosa.png"
          alt="Logo Impresa Rosa"
          className="parita-genere-image"
          width={100}
          height={100}
        />
      </div>
    </div>
  )
}
