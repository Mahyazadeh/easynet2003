import Image from 'next/image'
import Link from 'next/link'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`pt-4 pb-3 bg-dark text-white ${styles.footer}`}>
      <div className="container">
        <div className="row justify-content-center">
          {/* Logo Section */}
          <div className="col-12 mb-4 text-center">
            <div>
              <Image src="media/logo.svg" width={90} height={90} alt="Easy Net logo" />
            </div>
          </div>

          {/* Addresses Section */}
          <div className="col-12 col-lg-3 col-sm-6">
            <div className="mb-4">
              <h6 className={`fw-bold mb-3 ${styles.heading}`}>Sede legale e operativa</h6>
              <p className={`mb-0 ${styles.text}`}>via Guglielmo Calderini, 68</p>
              <p className={styles.text}>00196 Roma RM</p>
            </div>
            <div>
              <h6 className={`fw-bold mb-3 ${styles.heading}`}>Sedi secondarie</h6>
              <p className={`mb-1 ${styles.text}`}>via Paolo da Cannobio, 2 20122 Milano</p>
              <p className={styles.text}>via A. Amato, 22 84131 Salerno</p>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="col-12 col-lg-3 col-sm-6">
            <div>
              <h6 className={`fw-bold mb-3 ${styles.heading}`}>Contatti</h6>
              <p className={`mb-1 ${styles.text}`}>
                Email:{' '}
                <a href="mailto:info@easynet2003.it" className={`text-white ${styles.link}`}>
                  info@easynet2003.it
                </a>
              </p>
              <p className={`mb-1 ${styles.text}`}>
                Phone:{' '}
                <a href="tel:+39068076438" className={`text-white ${styles.link}`}>
                  +39 (06) 8076438
                </a>
              </p>
              <p className={`mb-2 ${styles.text}`}>Fax: +39 (06) 80669000</p>
              <Link
                href="https://www.linkedin.com/company/easy-net-2003"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white ${styles.socialIcon}`}
              >
                <i className="fa-brands fa-square-linkedin"></i>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-2 col-sm-6">
            <div>
              <h6 className={`fw-bold mb-3 ${styles.heading}`}>Link utili</h6>
            </div>
            <div>
              <ul className="list-unstyled">
                <li>
                  <Link href="/privacy" className={`text-white ${styles.link}`}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie" className={`text-white ${styles.link}`}>
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Certifications Section */}
          <div className="col-12 col-lg-4 col-sm-6 d-flex">
            <div className="mb-3">
              <h6 className={`fw-bold mb-3 ${[styles.heading]}`} style={{textAlign:'center'}}>Azienda certificata</h6>
              <p className={`${styles.text}`} style={{textAlign:'center'}}>UNI EN ISO 9001 2015</p>
              <div className={`d-flex justify-content-center ${styles.imageWrapper}`}>
                <Image
                  src="/media/cersa.png"
                  width={100}
                  height={100}
                  alt="Cersa Certification"
                  className="mb-2"
                />
                <Link href="/parita-di-genere"
              className={`col-lg-4 col-sm-6  d-flex  align-items-center ${styles.impresaRosaImage}`}
            >
                <Image
                  src="/media/logo_impresa_rosa.png"
                  width={150}
                  height={100}
                  alt="Impresa Rosa"
                />
            </Link>
              </div>
              <p className={`mb-0 ${styles.text}`} style={{textAlign:'center'}}>CERTIFICATO N. 1407</p>
            </div>
            {/* <Link href="/parita-di-genere"
              className={`col-lg-4 col-sm-6 mt-3 d-flex justify-content-center align-items-center ${styles.impresaRosaImage}`}
            >
                <Image
                  src="/media/logo_impresa_rosa.png"
                  width={150}
                  height={100}
                  alt="Impresa Rosa"
                />
            </Link> */}
          </div>

        </div>
      </div>
    </footer>
  )
}
