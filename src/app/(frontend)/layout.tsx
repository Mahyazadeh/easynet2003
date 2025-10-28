import React from 'react'
import { Raleway } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata = {
  description: 'Il sito ufficiale di EasyNet2003',
  title: 'EasyNet2003',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={raleway.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
