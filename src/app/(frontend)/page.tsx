import { getPayload } from 'payload'

import BestPracticeSection from '@/components/best_practice/BestPracticeSection'
import ExperienceSection from '@/components/experience/ExperienceSection'
import Hero from '@/components/hero/Hero'
import NewsSection from '@/components/news/NewsSection'
import config from '@/payload.config'
import './styles.css'

export const COMPANY_NAME = 'Easy Net'
export const revalidate = 60;

export const metadata = {
  title: `Sviluppo Software, Consulenza e Formazione | ${COMPANY_NAME} Srl`,
  description: `Ci occupiamo di Sviluppo Software, System & Business Integration, Consulenza e Formazione Aziendale, Digital Innovation. Soluzioni e servizi professionali per le aziende`
}

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch latest news (mobile homepage needs these)
  const newsRes = await payload.find({
    collection: 'news',
    depth: 1,
    limit: 5,
    sort: '-date',
  })
  const newsItems = newsRes.docs

  // Fetch experience data (get the first/most recent one)
  const experienceRes = await payload.find({
    collection: 'experience',
    depth: 1,
    limit: 1,
  })
  const experience = experienceRes.docs[0]

  // Fetch best practices data (get the first/most recent one)
  const bestPracticeRes = await payload.find({
    collection: 'best-practices',
    depth: 1,
    limit: 1,
  })
  const bestPractice = bestPracticeRes.docs[0]

  return (
    <div className="homepage">
      <Hero />
      <div className="background-image">
        {experience && <ExperienceSection experience={experience} />}
        {bestPractice && <BestPracticeSection bestPractice={bestPractice} />}
        <NewsSection newsItems={newsItems} />
      </div>
    </div>
  )
}
