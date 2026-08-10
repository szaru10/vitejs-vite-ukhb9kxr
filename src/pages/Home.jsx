import { Link, useNavigate } from 'react-router-dom'

import '../App.css'

import logo from '../assets/logo.png'
import kamila from '../assets/kamila.png'


import {
  CalendarIcon,
  ClockIcon,
  HeartIcon,
  LashIcon,
  LipsIcon,
  FacebookIcon,
  InstagramIcon,
  TiktokIcon,
} from '../components/Icons.jsx'

function Home() {
  const navigate = useNavigate()

  const goToBooking = () => {
    navigate('/rezerwacja')
  }

  return (
    <div className="site">

      {/* HEADER */}
      <header className="header">
        <div className="header-inner">

          <a className="brand" href="#home">
            <img src={logo} alt="Pink Beauty Med" />
          </a>

          <nav className="nav">
            <a className="active" href="#home">
              STRONA GŁÓWNA
            </a>

            <a href="#about">
              O MNIE
            </a>

            <a href="#offer">
              OFERTA
            </a>

            <a href="#price">
              CENNIK
            </a>

            <a href="#faq">
              FAQ
            </a>

            <a href="#contact">
              KONTAKT
            </a>
          </nav>

          <button
            className="header-book"
            onClick={goToBooking}
          >
            <CalendarIcon />
            UMÓW WIZYTĘ
          </button>

        </div>
      </header>

      <style>{`
        .brand {
          justify-content: center;
        }

        .brand img {
          object-position: center;
          transform: translateX(3cm);
        }

        .floating-socials button {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .floating-socials button svg {
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
                className="primary-button"
                onClick={goToBooking}
              >
                <CalendarIcon />
                UMÓW WIZYTĘ
              </button>

              <button
                className="secondary-button"
                onClick={goToBooking}
              >
                <ClockIcon />
                SPRAWDŹ TERMINY
              </button>

            </div>


            {/* USŁUGI */}
            <div className="mini-services" id="offer">

              <div className="service-badge">

                <div className="service-badge-ring">
                  <div className="service-badge-circle">
                    <LashIcon />
                  </div>
                </div>

                <span className="service-badge-label">
                  STYLIZACJA
                  <br />
                  RZĘS
                </span>

              </div>


              <div className="service-badge">

                <div className="service-badge-ring">
                  <div className="service-badge-circle">
                    <LipsIcon />
                  </div>
                </div>

                <span className="service-badge-label">
                  MODELOWANIE
                  <br />
                  UST
                </span>

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

              <button
                type="button"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </button>

              <button
                type="button"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </button>

              <button
                type="button"
                aria-label="TikTok"
              >
                <TiktokIcon />
              </button>

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


      {/* REZERWACJA */}
      <section className="booking" id="booking">

        <p className="section-label">
          REZERWACJA ONLINE
        </p>

        <h2>
          Umów swoją wizytę
        </h2>

        <p className="booking-description">
          Wybierz usługę, dogodny dzień i godzinę, a na koniec
          zarezerwuj termin wpłacając zadatek 50 zł.
        </p>

        <button
          className="booking-button"
          type="button"
          onClick={goToBooking}
        >
          ROZPOCZNIJ REZERWACJĘ
        </button>

      </section>

      {/* STOPKA */}
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Pink Beauty Med. Wszelkie prawa zastrzeżone.</p>
        <Link to="/panel/logowanie" className="footer-admin-link">
          Panel administracyjny
        </Link>
      </footer>

    </div>
  )
}

export default Home