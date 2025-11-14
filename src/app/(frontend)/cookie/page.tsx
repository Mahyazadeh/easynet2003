import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import { parseFormattedText } from '@/lib/textFormatting'

export default async function Page() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const paginaRes = await payload.find({
    collection: 'simple-page',
    where: {
      title: {
        equals: 'Informativa per l’uso dei cookies sul sito EASYNET',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

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
