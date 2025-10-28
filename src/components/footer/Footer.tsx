import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-5 bg-dark text-white">
      <div className="container">
        <div className="row justify-content-center">
          {/* Logo Section */}
          <div className="col-12 col-lg-10 mb-4 text-center">
            <Image src="media/logo.svg" width={80} height={80} alt="Easy Net logo" />
          </div>

          {/* Addresses Section */}
          <div className="col-12 col-lg-3 col-sm-6 mb-4">
            <div className="mb-4">
              <h6 className="fw-bold">Sede Legale e operativa</h6>
              <p className="mb-0">via Guglielmo Calderini, 68</p>
              <p>00196 Roma RM</p>
            </div>
            <div>
              <h6 className="fw-bold">Sedi territoriali</h6>
              <p className="mb-1">via Paolo Da Cannobio, 2 20122 Milano</p>
              <p>via A. Amato, 22 84131 Salerno</p>
            </div>
          </div>

          {/* Contacts Section */}
          <div className="col-12 col-lg-3 col-sm-6 mb-4">
            <div className="mb-3">
              <h6 className="fw-bold">Contatti</h6>
              <p className="mb-1">
                Email:{' '}
                <a href="mailto:info@easynet2003.it" className="text-white">
                  info@easynet2003.it
                </a>
              </p>
              <p className="mb-1">
                Phone:{' '}
                <a href="tel:+39068076438" className="text-white">
                  +39 (06) 8076438
                </a>
              </p>
              <p className="mb-2">Fax: +39 (06) 80669000</p>
              <a
                href="https://www.linkedin.com/company/easy-net-2003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white"
              >
                <i className="fa fa-2x fa-linkedin-square"></i>
              </a>
            </div>
            <div>
              <ul className="list-unstyled">
                <li>
                  <Link href="/privacy" className="text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie" className="text-white">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="col-12 col-lg-3 mb-4">
            <div className="row">
              <div className="col-lg-8 col-sm-6 text-center mb-3">
                <p className="fw-bold mb-2">AZIENDA CERTIFICATA</p>
                <p className="mb-4">UNI EN ISO 9001 2015</p>
                <div className="d-flex justify-content-center mb-3">
                  <Image
                    src="/media/cersa.png"
                    width={100}
                    height={50}
                    alt="Cersa Certification"
                    className="img-fluid mb-2"
                  />
                </div>
                <p className="mb-0">CERTIFICATO N. 1407</p>
              </div>
              <div className="col-lg-4 col-sm-6 d-flex justify-content-center">
                <Image
                  src="/media/logo_impresa_rosa.png"
                  width={100}
                  height={100}
                  alt="Impresa Rosa"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
