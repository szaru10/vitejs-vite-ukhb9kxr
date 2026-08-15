import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../App.css'

import logo from '../assets/logo.png'
import kamila from '../assets/kamila.png'
import lashIcon from '../assets/lash-icon.jpg'
import lipsIcon from '../assets/lips-icon.jpg'

import {
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from '../components/Icons.jsx'

const NAV_LINKS = [
  { href: '#home', label: 'STRONA GŁÓWNA' },
  { href: '#about', label: 'O MNIE' },
  { href: '#offer', label: 'OFERTA' },
  { href: '#price', label: 'CENNIK' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'KONTAKT' },
]

function Home() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const goToBooking = () => {
    navigate('/rezerwacja')
  }

  return (
    <div>

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">

        <button
  type="button"
  className="mobile-menu-toggle"
  aria-label="Otwórz menu"
  onClick={() => setIsMenuOpen(true)}
>
  ☰
</button>

          <a className="brand" href="#home">
            <img src={logo} alt="Pink Beauty Med" />
          </a>

          <nav className="nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className={link.href === '#home' ? 'active' : undefined}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="header-book"
            onClick={goToBooking}
          >
            <CalendarIcon />
            UMÓW WIZYTĘ
          </button>

        </div>
      </header>


      {/* MOBILNE MENU */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="mobile-nav-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
  type="button"
  className="mobile-nav-close"
  aria-label="Zamknij menu"
  onClick={() => setIsMenuOpen(false)}
>
  ×
</button>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

          </div>
        </div>
      )}


      <style>{`
        .brand {
          justify-content: center;
        }

        .brand img {
          object-position: center;
        }

        @media (min-width: 651px) {
          .brand img {
            transform: translateX(3cm);
          }
        }

        .floating-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-socials a svg {
          width: 20px;
        }
      `}</style>


      {/* HERO */}
      <main className="hero" id="home">

        <div className="hero-inner">

          {/* LEWA STRONA */}
          <section className="hero-content">

            <div className="hero-decoration">
              <span />
              <HeartIcon />
              <span />
            </div>

            <h1>
              Podkreśl swoje
              <strong>
                naturalne piękno
              </strong>
            </h1>

            <p className="hero-description">
              Profesjonalna stylizacja rzęs i modelowanie ust
              w kameralnym gabinecie. Umów wizytę online
              w kilka chwil — szybko, wygodnie i bez telefonu.
            </p>


            <div className="hero-buttons">

              <button
                type="button"
                className="primary-button"
                onClick={goToBooking}
              >
                <CalendarIcon />
                UMÓW WIZYTĘ
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={goToBooking}
              >
                <ClockIcon />
                SPRAWDŹ TERMINY
              </button>

            </div>


            {/* USŁUGI */}
            <div className="mini-services" id="offer">

              <div className="service-card service-card--lash">

                <div className="service-card-icon">
                  <img src={lashIcon} alt="Stylizacja rzęs" />
                </div>

                <div className="service-card-text">
                  <strong>Stylizacja rzęs</strong>
                  <span>Piękne spojrzenie na dłużej</span>
                </div>

              </div>


              <div className="service-card service-card--lips">

                <div className="service-card-icon">
                  <img src={lipsIcon} alt="Modelowanie ust" />
                </div>

                <div className="service-card-text">
                  <strong>Modelowanie ust</strong>
                  <span>Pełne, zmysłowe usta</span>
                </div>

              </div>

            </div>

          </section>


          {/* PRAWA STRONA */}
          <section className="hero-visual">

            <img
              className="kamila"
              src={kamila}
              alt="Kamila Tomczyk"
            />

            <div className="floating-socials">

              <a
                href="https://www.facebook.com/profile.php?id=100063579820348"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://www.instagram.com/stylizacjarzeskamila_m"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.tiktok.com/@stylizacjarzeskm?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <TiktokIcon />
              </a>

            </div>

          </section>

        </div>

      </main>


      {/* DOLNY PASEK */}
      <section className="benefits">

        <div className="benefit">

          <div className="benefit-icon">
            <CalendarIcon />
          </div>

          <div>
            <strong>
              WYGODNA REZERWACJA
            </strong>

            <p>
              Umów wizytę online 24/7
              <br />
              w kilku prostych krokach
            </p>
          </div>

        </div>


        <div className="benefit-line" />


        <div className="benefit">

          <div className="benefit-icon">
            ♡
          </div>

          <div>
            <strong>
              INDYWIDUALNE PODEJŚCIE
            </strong>

            <p>
              Stylizacja dopasowana
              <br />
              do Twojej urody
            </p>
          </div>

        </div>


        <div className="benefit-line" />


        <div className="benefit">

          <div className="benefit-icon">
            ✦
          </div>

          <div>
            <strong>
              NATURALNE EFEKTY
            </strong>

            <p>
              Podkreślam Twoje piękno
              <br />
              w subtelny sposób
            </p>
          </div>

        </div>


        <div className="benefit-line" />


        <div className="benefit">

          <div className="benefit-icon">
            ✓
          </div>

          <div>
            <strong>
              REZERWACJA POTWIERDZONA
            </strong>

            <p>
              Zadatek 50 zł
              <br />
              gwarantuje termin
            </p>
          </div>

        </div>

      </section>


      {/* STOPKA */}
      <footer className="site-footer">

        <p>
          © {new Date().getFullYear()} Pink Beauty Med. Wszelkie prawa zastrzeżone.
        </p>

        <Link
          to="/panel/logowanie"
          className="footer-admin-link"
        >
          Panel administracyjny
        </Link>

      </footer>

    </div>
  )
}

export default Home