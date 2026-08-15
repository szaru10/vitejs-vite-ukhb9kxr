import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../App.css'

import logo from '../assets/logo.png'
import kamila from '../assets/kamila.png'
import kamilaAbout from '../assets/kamila-about.png'
import lashIcon from '../assets/lash-icon.jpg'
import lipsIcon from '../assets/lips-icon.jpg'

import {
  LASH_STYLES,
  LASH_EXTRAS,
  LASH_REMOVAL_NOTE,
  LIP_TREATMENTS,
  HYALURONIDASE_TREATMENTS,
} from '../data/services.js'

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
  { href: '#contact', label: 'KONTAKT' },
]

const LASH_FROM_PRICE = Math.min(...LASH_STYLES.map((style) => style.zalozenie))
const LIPS_FROM_PRICE = Math.min(...LIP_TREATMENTS.map((item) => item.price))
const HYALURONIDASE_FROM_PRICE = Math.min(...HYALURONIDASE_TREATMENTS.map((item) => item.price))

const OFFER_CARDS = [
  {
    id: 'lashes',
    title: 'Stylizacja rzęs',
    description:
      'Od klasyki 1:1, przez Light, Russian i Mega volume, po efekty Kim Camellia, Wispy i Lami — dobieram stylizację do kształtu oka i charakteru spojrzenia.',
    fromPrice: LASH_FROM_PRICE,
  },
  {
    id: 'express',
    title: 'Express Set',
    description:
      'Piękne podkreślenie spojrzenia w zaledwie 60 minut. Idealna opcja dla kobiet, które ciągle gdzieś pędzą, ale chcą wyglądać zadbanie.',
    fromPrice: 150,
  },
  {
    id: 'lips',
    title: 'Powiększanie i modelowanie ust',
    description:
      'Kwas hialuronowy w dawce 0.5 ml lub 1 ml — naturalne podkreślenie konturu i objętości, dopasowane do proporcji Twojej twarzy.',
    fromPrice: LIPS_FROM_PRICE,
    badge: 'nowość',
  },
  {
    id: 'hyaluronidase',
    title: 'Hialuronidaza',
    description:
      'Częściowe lub całościowe rozpuszczenie wcześniej podanego kwasu hialuronowego — bezpieczna korekta efektów innych zabiegów.',
    fromPrice: HYALURONIDASE_FROM_PRICE,
  },
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
            <div className="mini-services">

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

      </section>


      {/* OFERTA */}
      <section className="services-offer" id="offer">

        <div className="services-offer-header">

          <div className="hero-decoration">
            <span />
            <HeartIcon />
            <span />
          </div>

          <p className="section-label">CO ROBIĘ</p>

          <p className="services-offer-intro">
            Stylizacja rzęs to moja największa pasja, ale zajmuję się też
            powiększaniem i modelowaniem ust. Poniżej znajdziesz skrót
            oferty — pełny cennik ze wszystkimi wariantami zobaczysz niżej.
          </p>

        </div>

        <div className="services-offer-grid">
          {OFFER_CARDS.map(({ id, title, description, fromPrice, badge }) => (
            <div key={id} className="services-offer-card">

              <h3>
                {title}
                {badge && <span className="price-badge">{badge}</span>}
              </h3>

              <p>{description}</p>

              <div className="services-offer-card-footer">
                <span className="services-offer-card-price">
                  od <strong>{fromPrice} zł</strong>
                </span>
                <a href="#price" className="services-offer-card-link">
                  Zobacz cennik →
                </a>
              </div>

            </div>
          ))}
        </div>

      </section>


      {/* CENNIK */}
      <section className="price" id="price">

        <div className="price-header">

          <div className="hero-decoration">
            <span />
            <HeartIcon />
            <span />
          </div>

          <p className="section-label">CENNIK</p>

          <p className="price-intro">
            Cennik obowiązuje od 1.12.2025 r. Ceny uzupełnień dotyczą
            wizyt do 4 tygodni od ostatniej stylizacji.
          </p>

        </div>


        {/* TABELA RZĘS */}
        <div className="price-table-wrap">

          <table className="price-table">
            <thead>
              <tr>
                <th className="price-table-name">Stylizacja rzęs</th>
                <th>Założenie</th>
                <th>Uzupełnienie<br />do 4 tyg.</th>
                <th>
                  Stylizacja UV
                  <span className="price-badge">nowość</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {LASH_STYLES.map((style) => (
                <tr key={style.id}>
                  <td className="price-table-name">{style.name}</td>
                  <td>{style.zalozenie} zł</td>
                  <td>{style.uzupelnienie} zł</td>
                  <td>{style.uv} zł</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className="price-extras">
          {LASH_EXTRAS.map((extra) => (
            <span key={extra.id} className="price-extra">
              {extra.name} — <strong>{extra.price} zł</strong>
            </span>
          ))}
          <span className="price-extra price-extra--note">
            {LASH_REMOVAL_NOTE}
          </span>
        </div>


        {/* USTA I HIALURONIDAZA */}
        <div className="price-secondary">

          <div className="price-card">

            <p className="price-card-label">
              POWIĘKSZANIE I MODELOWANIE UST
              <span className="price-badge">nowość</span>
            </p>

            <ul className="price-card-list">
              {LIP_TREATMENTS.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.price} zł</strong>
                </li>
              ))}
            </ul>

          </div>

          <div className="price-card">

            <p className="price-card-label">HIALURONIDAZA</p>

            <ul className="price-card-list">
              {HYALURONIDASE_TREATMENTS.map((item) => (
                <li key={item.id}>
                  <span>{item.name}</span>
                  <strong>{item.price} zł</strong>
                </li>
              ))}
            </ul>

          </div>

        </div>

        <button
          type="button"
          className="primary-button price-cta"
          onClick={goToBooking}
        >
          <CalendarIcon />
          UMÓW WIZYTĘ
        </button>

      </section>


      {/* KONTAKT */}
      <section className="contact" id="contact">

        <div className="contact-box">

          <p className="section-label">KONTAKT</p>

          <h3>Masz pytanie? Napisz lub zadzwoń</h3>

          <p className="contact-box-description">
            Nie wiesz, jaki efekt wybrać, czy chcesz umówić wizytę na
            stylizację rzęs, korektę, powiększanie i modelowanie ust,
            hialuronidazę lub inną dostępną usługę — chętnie odpowiem
            i dobiorę rozwiązanie do Twoich oczekiwań.
          </p>

          <div className="contact-box-links">

            <a href="tel:791805599" className="contact-box-link">
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
              className="contact-box-link"
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
              className="contact-box-link"
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