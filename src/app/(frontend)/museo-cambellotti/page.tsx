import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'

export default async function Page() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'Museo Cambellotti',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

  return (
    <div className="easynet2003-page background-image">
      {pagina && <GeneralSection item={pagina} />}
    </div>
  )
}
