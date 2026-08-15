import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../App.css'

import logo from '../assets/logo.png'
import kamila from '../assets/kamila.png'
import kamilaAbout from '../assets/kamila-about.png'
import lashIcon from '../assets/lash-icon.jpg'
import lipsIcon from '../assets/lips-icon.jpg'

import {
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
  MessengerIcon,
  PhoneIcon,
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


      {/* O MNIE */}
      <section className="about" id="about">

        <div className="about-inner">

          <div className="about-visual">
            <img
              className="about-photo"
              src={kamilaAbout}
              alt="Kamila Tomczyk"
            />
          </div>

          <div className="about-content">

            <div className="hero-decoration">
              <span />
              <HeartIcon />
              <span />
            </div>

            <p className="section-label">POZNAJMY SIĘ</p>

            <h2>
              Cześć, jestem
              <strong>Kamila</strong>
            </h2>

            <p className="about-text">
              Stylizacją rzęs zajmuję się od 2017 roku — to już ponad 9 lat
              mojej największej zawodowej pasji. Przez te wszystkie lata
              stała się nie tylko moją pracą, ale częścią mnie. Najbardziej
              odnajduję się w mocnych stylizacjach objętościowych — kocham
              gęstość, idealną linię i dopracowany każdy szczegół.
            </p>

            <p className="about-text">
              Cały czas się szkolę i szukam nowych możliwości. Kocham
              klasyczną, równą linię, ale jeśli lubisz Efekt Kim, Wispy
              czy inne nietuzinkowe stylizacje — chętnie pokombinuję
              i stworzę coś wyjątkowego właśnie dla Ciebie. Nie boję się
              też odrobiny szaleństwa w pracy z kolorem, kiedy stylizacja
              ma mieć charakter.
            </p>

            <p className="about-text">
              Dla kobiet w biegu polecam Express Set — piękne podkreślenie
              spojrzenia w zaledwie 60 minut. Zajmuję się również
              powiększaniem i modelowaniem ust, stale poszerzając swoją
              wiedzę w tym kierunku.
            </p>

            <p className="about-text about-text--signature">
              Wierzę, że wizyta u stylistki to nie tylko piękne rzęsy
              czy usta, ale też czas dla siebie, rozmowa i dobra
              atmosfera. Uwielbiam moje klientki i swoją pracę —
              i naprawdę nie zamieniłabym jej na żadną inną.
            </p>

          </div>

        </div>


        {/* KONTAKT */}
        <div className="about-contact">

          <p className="section-label">KONTAKT</p>

          <h3>Masz pytanie? Napisz lub zadzwoń</h3>

          <p className="about-contact-description">
            Nie wiesz, jaki efekt wybrać, czy chcesz umówić wizytę na
            stylizację rzęs, korektę, powiększanie i modelowanie ust,
            hialuronidazę lub inną dostępną usługę — chętnie odpowiem
            i dobiorę rozwiązanie do Twoich oczekiwań.
          </p>

          <div className="about-contact-links">

            <a href="tel:791805599" className="about-contact-link">
              <PhoneIcon />
              <span>
                <strong>Telefon</strong>
                <em>791 805 599</em>
              </span>
            </a>

            <a
              href="https://m.me/PinkBeautyMed"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
            >
              <MessengerIcon />
              <span>
                <strong>Messenger</strong>
                <em>Napisz bezpośrednio</em>
              </span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100063579820348"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-link"
            >
              <FacebookIcon />
              <span>
                <strong>Facebook</strong>
                <em>Strona i profil prywatny</em>
              </span>
            </a>

          </div>

        </div>

      </section>


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