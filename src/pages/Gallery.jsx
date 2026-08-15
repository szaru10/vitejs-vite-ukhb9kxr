import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import './Gallery.css'

import logo from '../assets/logo.png'
import phoneIconImg from '../assets/phone-icon.png'
import messengerIconImg from '../assets/messenger-icon.png'
import facebookIconImg from '../assets/facebook-icon.png'

import lashes01 from '../assets/gallery/lashes-01.webp'
import lashes02 from '../assets/gallery/lashes-02.webp'
import lashes03 from '../assets/gallery/lashes-03.webp'
import lashes04 from '../assets/gallery/lashes-04.webp'
import lashes05 from '../assets/gallery/lashes-05.webp'
import lashes06 from '../assets/gallery/lashes-06.webp'
import lashes07 from '../assets/gallery/lashes-07.webp'

import lips01 from '../assets/gallery/lips-01.webp'
import lips02 from '../assets/gallery/lips-02.webp'
import lips03 from '../assets/gallery/lips-03.webp'
import lips04 from '../assets/gallery/lips-04.webp'

import { HeartIcon } from '../components/Icons.jsx'

const GALLERY_ITEMS = [
  {
    id: 'lashes-1',
    category: 'lashes',
    title: 'Naturalne spojrzenie',
    subtitle: 'Subtelna stylizacja podkreślająca naturalny kształt oka.',
    image: lashes01,
  },
  {
    id: 'lashes-2',
    category: 'lashes',
    title: 'Volume',
    subtitle: 'Miękka objętość i wyraziste, kobiece spojrzenie.',
    image: lashes02,
  },
  {
    id: 'lashes-3',
    category: 'lashes',
    title: 'Mega Volume',
    subtitle: 'Gęsty, mocny efekt dla klientek lubiących wyraziste rzęsy.',
    image: lashes03,
  },
  {
    id: 'lashes-4',
    category: 'lashes',
    title: 'Soft Volume',
    subtitle: 'Lekka, puszysta stylizacja dopasowana do kształtu oka.',
    image: lashes04,
  },
  {
    id: 'lashes-5',
    category: 'lashes',
    title: 'Russian Volume',
    subtitle: 'Gęsta linia rzęs z eleganckim, miękkim wykończeniem.',
    image: lashes05,
  },
  {
    id: 'lashes-6',
    category: 'lashes',
    title: 'Efekt naturalny',
    subtitle: 'Delikatna stylizacja na co dzień.',
    image: lashes06,
  },
  {
    id: 'lashes-7',
    category: 'lashes',
    title: 'Pełna stylizacja',
    subtitle: 'Wyraziste podkreślenie oka z równą i estetyczną linią rzęs.',
    image: lashes07,
  },
  {
    id: 'lips-1',
    category: 'lips',
    title: 'Modelowanie ust',
    subtitle: 'Naturalne podkreślenie kształtu i proporcji ust.',
    image: lips01,
  },
  {
    id: 'lips-2',
    category: 'lips',
    title: 'Glossy Lips',
    subtitle: 'Pełniejszy efekt z miękkim, błyszczącym wykończeniem.',
    image: lips02,
  },
  {
    id: 'lips-3',
    category: 'lips',
    title: 'Natural Lips',
    subtitle: 'Subtelny efekt i delikatnie zaznaczony kontur.',
    image: lips03,
  },
  {
    id: 'lips-4',
    category: 'lips',
    title: 'Pink Lips',
    subtitle: 'Kobiecy efekt z zachowaniem naturalnych proporcji.',
    image: lips04,
  },
]

const NAV_LINKS = [
  { href: '/#home', label: 'STRONA GŁÓWNA' },
  { href: '/#about', label: 'O MNIE' },
  { href: '/#offer', label: 'OFERTA' },
  { href: '/galeria', label: 'GALERIA', active: true },
  { href: '/#price', label: 'CENNIK' },
  { href: '/#contact', label: 'KONTAKT' },
]

function Gallery() {
  const [activeCategory, setActiveCategory] = useState('lashes')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredItems = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const selectedItem = filteredItems[selectedIndex] || filteredItems[0]

  const changeCategory = (category) => {
    setActiveCategory(category)
    setSelectedIndex(0)
    setIsLightboxOpen(false)
  }

  const selectItem = (index, openLightbox = false) => {
    setSelectedIndex(index)
    if (openLightbox) setIsLightboxOpen(true)
  }

  const previousItem = (event) => {
    event?.stopPropagation()
    setSelectedIndex((current) =>
      current === 0 ? filteredItems.length - 1 : current - 1,
    )
  }

  const nextItem = (event) => {
    event?.stopPropagation()
    setSelectedIndex((current) =>
      current === filteredItems.length - 1 ? 0 : current + 1,
    )
  }

  return (
    <div className="gallery-page">
      <header className="header gallery-header">
        <div className="header-inner">
          <button
            type="button"
            className="mobile-menu-toggle gallery-menu-toggle"
            aria-label="Otwórz menu"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>

          <a className="brand" href="/#home">
            <img src={logo} alt="Pink Beauty Med" />
          </a>

          <nav className="nav gallery-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={link.active ? 'active' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setIsMenuOpen(false)}>
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
                className={link.active ? 'active' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

          </div>
        </div>
      )}

      <main className="gallery-main">
        <section className="gallery-hero">
          <div className="gallery-heading">
            <div className="hero-decoration gallery-decoration">
              <span />
              <HeartIcon />
              <span />
            </div>

            <p className="gallery-kicker">GALERIA</p>
            <h1>
              Moje <strong>realizacje</strong>
            </h1>
            <p>
              Zobacz efekty mojej pracy. Wybierz rzęsy lub usta i przejrzyj
              realizacje w dużym podglądzie.
            </p>

            <div className="gallery-filters" role="tablist" aria-label="Kategorie galerii">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'lashes'}
                className={activeCategory === 'lashes' ? 'active' : ''}
                onClick={() => changeCategory('lashes')}
              >
                RZĘSY
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'lips'}
                className={activeCategory === 'lips' ? 'active' : ''}
                onClick={() => changeCategory('lips')}
              >
                USTA
              </button>
            </div>
          </div>

          <div className="gallery-content">
            <div className="gallery-grid">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`gallery-card${selectedIndex === index ? ' selected' : ''}`}
                  onClick={() => selectItem(index, true)}
                  aria-label={`Otwórz zdjęcie: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <span className="gallery-card-overlay">
                    <strong>{item.title}</strong>
                    <em>{item.subtitle}</em>
                  </span>
                </button>
              ))}
            </div>

            <aside className="gallery-preview">
              <button
                type="button"
                className="gallery-preview-image"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Powiększ wybrane zdjęcie"
              >
                <img src={selectedItem.image} alt={selectedItem.title} />
              </button>

              <button
                type="button"
                className="gallery-arrow gallery-arrow--left"
                onClick={previousItem}
                aria-label="Poprzednie zdjęcie"
              >
                ←
              </button>

              <button
                type="button"
                className="gallery-arrow gallery-arrow--right"
                onClick={nextItem}
                aria-label="Następne zdjęcie"
              >
                →
              </button>

              <div className="gallery-preview-info">
                <span className="gallery-counter">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
                <span className="gallery-heart">♡</span>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.subtitle}</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="gallery-contact">
          <div className="gallery-contact-copy">
            <h2>
              Masz pytanie? <strong>Napisz lub zadzwoń</strong>
            </h2>
            <p>Chętnie odpowiem i pomogę dobrać idealną usługę dla Ciebie.</p>
          </div>

          <div className="gallery-contact-links">
            <a href="tel:791805599" className="gallery-contact-link">
              <img src={phoneIconImg} alt="" />
              <span>
                <strong>Telefon</strong>
                <em>791 805 599</em>
              </span>
            </a>

            <a
              href="https://m.me/100063579820348"
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-contact-link"
            >
              <img src={messengerIconImg} alt="" />
              <span>
                <strong>Messenger</strong>
                <em>Napisz bezpośrednio</em>
              </span>
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=100063579820348"
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-contact-link"
            >
              <img src={facebookIconImg} alt="" />
              <span>
                <strong>Facebook</strong>
                <em>Strona i profil prywatny</em>
              </span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer gallery-footer">
        <p>© {new Date().getFullYear()} Pink Beauty Med. Wszelkie prawa zastrzeżone.</p>
        <Link to="/panel/logowanie" className="footer-admin-link">
          Panel administracyjny
        </Link>
      </footer>

      {isLightboxOpen && (
        <div className="gallery-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div
            className="gallery-lightbox-card"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Zamknij podgląd"
            >
              ×
            </button>

            <img
              className="gallery-lightbox-image"
              src={selectedItem.image}
              alt={selectedItem.title}
            />

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow--left"
              onClick={previousItem}
              aria-label="Poprzednie zdjęcie"
            >
              ←
            </button>

            <button
              type="button"
              className="gallery-lightbox-arrow gallery-lightbox-arrow--right"
              onClick={nextItem}
              aria-label="Następne zdjęcie"
            >
              →
            </button>

            <div className="gallery-lightbox-info">
              <span>{selectedIndex + 1} / {filteredItems.length}</span>
              <h2>{selectedItem.title}</h2>
              <p>{selectedItem.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery