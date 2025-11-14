import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import NewsCard from '@/components/news/NewsCard'
import GeneralSection from '@/components/pages-with-sections/GeneralSection'

const ITEMS_PER_PAGE = 10

interface NewsPageProps {
  searchParams?: Promise<{
    page?: string
  }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const params = await searchParams
  const currentPage = Math.max(1, Number(params?.page) || 1)

  const newsRes = await payload.find({
    collection: 'news',
    depth: 1,
    sort: '-date',
    limit: ITEMS_PER_PAGE,
    page: currentPage,
  })

  const paginaRes = await payload.find({
    collection: 'page-with-sections',
    where: {
      title: {
        equals: 'News',
      },
    },
    depth: 1,
    limit: 1,
  })
  const pagina = paginaRes.docs[0]

  const newsItems = newsRes.docs
  const totalPages = newsRes.totalPages || 1

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="news-page easynet2003-page background-image">
      {pagina && <GeneralSection item={pagina} />}
      <div className="container py-5">
        <div className="row g-4">
          {newsItems.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-lg-4">
              <NewsCard item={item} />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            className="d-flex justify-content-center align-items-center gap-2 mt-5"
            aria-label="Paginazione news"
          >
            {currentPage > 1 ? (
              <Link
                href={`/news?page=${currentPage - 1}`}
                className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
              >
                <Image src="/media/arrow_left.svg" alt="Precedente" width={20} height={20} />
                Precedente
              </Link>
            ) : (
              <span className="btn btn-outline-light btn-sm disabled d-flex align-items-center gap-2 opacity-50">
                <Image src="/media/arrow_left.svg" alt="Precedente" width={20} height={20} />
                Precedente
              </span>
            )}

            <div className="d-flex align-items-center gap-2">
              {pageNumbers.map((pageNumber) =>
                pageNumber === currentPage ? (
                  <span
                    key={pageNumber}
                    className="btn btn-light btn-sm active"
                    aria-current="page"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    key={pageNumber}
                    href={`/news?page=${pageNumber}`}
                    className="btn btn-outline-light btn-sm"
                  >
                    {pageNumber}
                  </Link>
                ),
              )}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={`/news?page=${currentPage + 1}`}
                className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
              >
                Successiva
                <Image src="/media/arrow_right.svg" alt="Successiva" width={20} height={20} />
              </Link>
            ) : (
              <span className="btn btn-outline-light btn-sm disabled d-flex align-items-center gap-2 opacity-50">
                Successiva
                <Image src="/media/arrow_right.svg" alt="Successiva" width={20} height={20} />
              </span>
            )}
          </nav>
        )}
      </div>
    </div>
  )
}
