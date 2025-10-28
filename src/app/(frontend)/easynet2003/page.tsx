import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import AziendaSection from '@/components/azienda/AziendaSection'
import Footer from '@/components/footer/Footer'

export default async function Easynet2003Page() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch pagina con sezioni data (get the first/most recent one)
  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

  return (
    <div className="easynet2003-page background-image">
      {pagina && <AziendaSection azienda={pagina} />}
      <Footer />
    </div>
  )
}
