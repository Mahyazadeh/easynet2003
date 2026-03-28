import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://easynet2003.it'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []

  // Pagine statiche
  const staticPages = [
    { url: '',changefreq: 'weekly' as const,  priority: 1.0 },
    { url: '/sviluppo-applicativo-software', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/system-business-integration', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/consulenza-formazione-aziendale', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/digital-innovation', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/campagna-contro-bullismo', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/sistema-prototipale', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/museo-cambellotti', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/rankpa-indicatore', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/azienda', changefreq: 'monthly' as const, priority: 0.8 },
    { url: '/clienti', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/partners', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/news', changefreq: 'daily' as const,  priority: 0.8 },
    { url: '/contatti', changefreq: 'monthly' as const, priority: 0.6 },
  ]

  const now = new Date()

  staticPages.forEach(page => {
    sitemap.push({
      url: `${baseUrl}${page.url}`,
      lastModified: now,
      changeFrequency: page.changefreq,
      priority: page.priority,
    })
  })

  // Pagine dinamiche da Payload
  try {
    const payload = await getPayload({ config: await config })

    const { docs } = await payload.find({
      collection: 'page-with-sections',
      where: { _status: { equals: 'published' } },
      depth: 0,
      limit: 0,
    })

    docs.forEach((doc: any) => {
      if (doc.slug && doc.slug !== 'home') {
        sitemap.push({
          url: `${baseUrl}/${doc.slug}`,
          lastModified: new Date(doc.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })
      }
    })
  } catch (error) {
    console.error('Errore sitemap page-with-sections:', error)
  }

  return sitemap
}