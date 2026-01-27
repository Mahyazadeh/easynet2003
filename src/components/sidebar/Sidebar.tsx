'use client'

import React, { useState, useRef, useEffect } from 'react'
import styles from './Sidebar.module.scss'

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
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/easynet2003">Azienda</a>
          </li>
          <li>
            <a href="/clienti">Clienti</a>
          </li>
          <li>
            <a href="/partners">Partners</a>
          </li>
          <li>
            <a href="/news">News</a>
          </li>
          <li>
            <a href="/contatti">Contatti</a>
          </li>
        </ul>
      </div>
    </div>
  )
}
