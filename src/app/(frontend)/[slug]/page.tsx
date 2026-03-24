import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
import { notFound } from 'next/navigation'

export const revalidate = 60;

// Next.js passa automaticamente i parametri dell'URL a questa funzione
interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  // 1. Recuperiamo lo slug dall'URL (es. "its-maria-gaetana-agnesi")
  const { slug } = await params
  
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // 2. Cerchiamo nel CMS la pagina che ha quel valore nel campo 'slug'
  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 1,
    limit: 1,
  })

  const pagina = paginaRes.docs[0]

  // 3. Se non troviamo nessuna pagina con quello slug, mostriamo 404
  if (!pagina) {
    return notFound()
  }

  return (
    <div className="easynet2003-page background-image">
      <GeneralSection item={pagina} />
    </div>
  )
}