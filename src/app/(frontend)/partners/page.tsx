import Image from 'next/image'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'

export default async function PartnersPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'Partners',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

  const partners = [
    {
      name: 'Dataweb',
      logo: '/media/partners/dataweb.png',
      website: 'https://www.datastampa.it/',
    },
    {
      name: 'Digital Engineering',
      logo: '/media/partners/digital_engineering.png',
      website: 'https://www.digitalengineering.it/',
    },
    {
      name: 'HandSigns',
      logo: '/media/partners/HandSigns.png',
      website: 'https://www.handysigns.it/',
    },
    {
      name: 'ITS',
      logo: '/media/partners/its.png',
      website: 'https://www.itsagnesi.it/',
    },
    {
      name: 'Itlogix',
      logo: '/media/partners/itlogix.png',
      website: 'https://www.itlogix.it/',
    },
    {
      name: 'Nexing',
      logo: '/media/partners/NEXING.png',
      website: 'https://www.nexing.it',
    },
    {
      name: 'Numaweb',
      logo: '/media/partners/numaweb.png',
      website: 'https://www.numaweb.it/',
    },
    {
      name: 'Quadrante Impresa',
      logo: '/media/partners/quadrante-impresa.png',
      website: 'http://www.quadrantedimpresa.it/',
    },
  ]

  return (
    <div className="partners-page easynet2003-page background-image">
      {pagina && <GeneralSection item={pagina} />}

      <div className="container py-3 pb-5">
        <div className="row g-4">
          {partners.map((partner) => (
            <div key={partner.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                  <div className="card-body d-flex align-items-center justify-content-center p-4">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      width={200}
                      height={100}
                      className="img-fluid"
                      style={{ objectFit: 'contain', maxHeight: '100px' }}
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
