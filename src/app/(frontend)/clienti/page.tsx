import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
import { cache } from 'react'
import { COMPANY_NAME } from '../page'

const clients = [
    {
      name: 'Accenture',
      logo: '/media/clienti/accenture.png',
      website: 'https://www.accenture.com',
    },
    {
      name: 'Alterna',
      logo: '/media/clienti/alterna.png',
      website: 'https://alternanet.it/',
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
      name: 'Comune di Latina',
      logo: '/media/clienti/comune-latina.jpg',
      website: 'https://www.comune.latina.it',
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
      website: 'https://www.iccreabanca.it/it-IT/Pagine/default.aspx',
    },
    {
      name: 'Inoltre',
      logo: '/media/clienti/inoltre.jpg',
      website: 'https://www.inoltrenews.it/',
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
    },
     {
      name: 'OverNet Education',
      logo: '/media/clienti/OverNet.png',
      website: 'https://overnet.education/',
    }
  ]

const getPagina = cache(async () => {
  try {
    const payloadConfig = await config    
    const payload = await getPayload({ config: payloadConfig })
    
    const res = await payload.find({
      collection: 'page-with-sections',
      where: {
        title: { equals: 'Clienti' },
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

export default async function ClientiPage() {
  const pagina = await getPagina()
  
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
