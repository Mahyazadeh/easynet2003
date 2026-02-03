import React from 'react'
import { Raleway } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './styles.css'
import Footer from '@/components/footer/Footer'
import Sidebar from '@/components/sidebar/Sidebar'


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
        <Sidebar />          
        <main >
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
