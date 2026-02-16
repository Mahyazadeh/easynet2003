'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <div className={styles.sidebarContainer} ref={sidebarRef}>
      <button
        className={`${styles.sidebarButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className={`${styles.hamburger} ${isOpen ? styles.hidden : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <div className={`${styles.sidebarMenu} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.menuList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/easynet2003">Azienda</Link>
          </li>
          <li>
            <Link href="/clienti">Clienti</Link>
          </li>
          <li>
            <Link href="/partners">Partners</Link>
          </li>
          <li>
            <Link href="/news">News</Link>
          </li>
          <li>
            <Link href="/contatti">Contatti</Link>
          </li>
        </ul>
      </div>
    </div>
    <div className="logo-fixed">
          <Image src="/media/Logo_EasyNet_2026.svg" width={90} height={90} alt="Easy Net logo" />
      </div>
    </>
  )
}
