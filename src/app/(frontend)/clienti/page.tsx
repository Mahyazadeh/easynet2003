import Image from 'next/image'
import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
export default async function ClientiPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'Clienti',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

  const clients = [
    {
      name: 'Accenture',
      logo: '/media/clienti/accenture.png',
      website: 'https://www.accenture.com',
    },
    {
      name: 'Alterna',
      logo: '/media/clienti/alterna.png',
      website: 'https://www.alterna.it',
    },
    {
      name: 'Arthur D. Little',
      logo: '/media/clienti/arthur-d-little.png',
      website: 'https://www.adlittle.com',
    },
    {
      name: 'BCC Gambatesa',
      logo: '/media/clienti/bcc-gambatesa.jpg',
      website: 'https://www.bccgambatesa.it',
    },
    {
      name: 'BCC Sistemi Informatici',
      logo: '/media/clienti/bcc-sistemi-informatici.svg',
      website: 'https://www.bccsi.it',
    },
    {
      name: 'Comune di Latina',
      logo: '/media/clienti/comune-latina.jpg',
      website: 'https://www.comune.latina.it',
    },
    {
      name: 'Inoltre',
      logo: '/media/clienti/inoltre.jpg',
      website: 'https://www.datastampa.it',
    },
    {
      name: 'Engineering',
      logo: '/media/clienti/engineering.png',
      website: 'https://www.eng.it',
    },
    {
      name: 'Foncoop',
      logo: '/media/clienti/foncoop.png',
      website: 'https://www.foncoop.coop',
    },
    {
      name: 'Iccrea',
      logo: '/media/clienti/iccrea-banca.png',
      website: 'https://www.iccrea.it',
    },
    {
      name: 'ISED',
      logo: '/media/clienti/ised.png',
      website: 'https://www.ised.it',
    },
    {
      name: 'Lazio Crea',
      logo: '/media/clienti/laziocrea.png',
      website: 'https://www.laziocrea.it',
    }
  ]

  return (
    <div className="clienti-page easynet2003-page background-image">
      {pagina && <GeneralSection item={pagina} />}

      <div className="container py-3 pb-5">
        <div className="row g-4">
          {clients.map((client) => (
            <div key={client.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                  <div className="card-body d-flex align-items-center justify-content-center p-4">
                    <Image
                      src={client.logo}
                      alt={`Logo ${client.name}`}
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
