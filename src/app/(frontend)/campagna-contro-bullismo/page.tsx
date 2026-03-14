import { getPayload } from 'payload'
import config from '@/payload.config'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'
import { cache } from 'react'
import { COMPANY_NAME } from '../page'


const getPagina = cache(async () => {
  try {
    const payloadConfig = await config    
    const payload = await getPayload({ config: payloadConfig })
    
    const res = await payload.find({
      collection: 'page-with-sections',
      where: {
        title: { equals: 'Campagna contro bullismo' },
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
    </div>
  )
}

export const dynamic = 'force-dynamic'