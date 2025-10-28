import { getPayload } from 'payload'
import config from '@/payload.config'
import HeroCarousel from './HeroCarousel'

export default async function Hero() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const heroImages = await payload.find({
    collection: 'hero-images',
    where: {
      active: {
        equals: true,
      },
    },
    depth: 1,
    limit: 10,
    sort: 'order',
  })

  if (!heroImages.docs.length) {
    return null
  }

  return <HeroCarousel items={heroImages.docs} />
}
