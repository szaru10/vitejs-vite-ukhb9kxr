import './App.css'

import logo from './assets/logo.png'
import kamila from './assets/kamila.png'

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v3M17 2v3M3.5 9h17M5 4.5h14a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5a2 2 0 0 1 2-2Z" />
      <path d="M7 13h3M14 13h3M7 17h3M14 17h3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.8 5.6c-2-2.2-5.3-2.2-7.3-.1L12 7l-1.5-1.5c-2-2.1-5.3-2.1-7.3.1-1.8 2-1.6 5.1.3 7L12 21l8.5-8.4c1.9-1.9 2.1-5 .3-7Z" />
    </svg>
  )
}

function LashIcon() {
  return (
    <svg viewBox="0 0 60 28" aria-hidden="true">
      <path d="M4 16c9 7 20 9 29 8 9-.8 17-4 23-10" />
      <path d="M10 18 7 8M16 21 15 9M22 23 23 10M29 24 31 11M36 23 40 10M43 21 49 9M49 18 57 8" />
    </svg>
  )
}

function LipsIcon() {
  return (
    <svg viewBox="0 0 60 34" aria-hidden="true">
      <path d="M4 18c8-3 14-10 23-11l3 3 3-3c9 1 15 8 23 11-8 7-16 10-26 10S12 25 4 18Z" />
      <path d="M4 18h52" />
    </svg>
  )
}

function App() {
  const scrollToBooking = () => {
    document
      .getElementById('booking')
      ?.scrollIntoView({ behavior: 'smooth' })
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
            onClick={scrollToBooking}
          >
            <CalendarIcon />
            UMÓW WIZYTĘ
          </button>

        </div>
      </header>


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
                onClick={scrollToBooking}
              >
                <CalendarIcon />
                UMÓW WIZYTĘ
              </button>

              <button
                className="secondary-button"
                onClick={scrollToBooking}
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
                f
              </button>

              <button
                type="button"
                aria-label="Instagram"
              >
                ◎
              </button>

              <button
                type="button"
                aria-label="Lokalizacja"
              >
                ●
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
          W następnym kroku tutaj zbudujemy pełny system:
          wybór usługi, lokalizacji, dnia, godziny oraz płatność
          zadatku 50 zł.
        </p>

        <button
          className="booking-button"
          type="button"
        >
          ROZPOCZNIJ REZERWACJĘ
        </button>

      </section>

    </div>
  )
}

export default App