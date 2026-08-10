import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import './Booking.css'

import logo from '../assets/logo.png'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MailIcon,
  PhoneIcon,
  SparkleIcon,
} from '../components/Icons.jsx'

import { SERVICE_CATEGORIES, SERVICES, getServiceById } from '../data/services.js'
import { getAvailableDays, getTimeSlots } from '../data/availability.js'
import { supabase } from '../supabaseClient.js'

const STEPS = [
  { id: 1, label: 'Usługa' },
  { id: 2, label: 'Dzień' },
  { id: 3, label: 'Godzina' },
  { id: 4, label: 'Dane' },
  { id: 5, label: 'Podsumowanie' },
]

const DEPOSIT_AMOUNT = 50

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  notes: '',
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function isValidPhone(value) {
  const digits = value.replace(/[^0-9]/g, '')
  return digits.length >= 9
}

function formatPrice(price) {
  return `${price} zł`
}

function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} godz.` : `${hours} godz. ${rest} min`
}

function Booking() {
  const [step, setStep] = useState(1)
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0].id)
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [touched, setTouched] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('idle') // idle | processing | done
  const [paymentError, setPaymentError] = useState('')

  const selectedService = useMemo(
    () => getServiceById(selectedServiceId),
    [selectedServiceId],
  )

  const days = useMemo(() => getAvailableDays(21), [])

  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return []
    return getTimeSlots(selectedDate, selectedService.durationMinutes)
  }, [selectedDate, selectedService])

  const selectedDay = useMemo(
    () => days.find((day) => day.isoDate === selectedDate) ?? null,
    [days, selectedDate],
  )

  const bookingNumber = useMemo(() => {
    if (!selectedService || !selectedDate || !selectedTime) return ''
    const raw = `${selectedDate}${selectedTime}${selectedService.id}`
    let hash = 0
    for (let i = 0; i < raw.length; i++) hash = (hash * 31 + raw.charCodeAt(i)) | 0
    return `PBM-${Math.abs(hash).toString().slice(0, 6)}`
  }, [selectedService, selectedDate, selectedTime])

  const canGoNext = (() => {
    if (step === 1) return Boolean(selectedServiceId)
    if (step === 2) return Boolean(selectedDate)
    if (step === 3) return Boolean(selectedTime)
    if (step === 4) {
      return (
        form.firstName.trim().length > 1 &&
        form.lastName.trim().length > 1 &&
        isValidPhone(form.phone) &&
        isValidEmail(form.email)
      )
    }
    return true
  })()

  const goNext = () => {
    if (!canGoNext) {
      setTouched(true)
      return
    }
    setTouched(false)
    setStep((current) => Math.min(current + 1, STEPS.length))
  }

  const goBack = () => {
    setTouched(false)
    setStep((current) => Math.max(current - 1, 1))
  }

  const handleSelectService = (id) => {
    setSelectedServiceId(id)
    setSelectedTime(null)
  }

  const handleSelectDate = (isoDate) => {
    setSelectedDate(isoDate)
    setSelectedTime(null)
  }

  const handleFormChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handlePayDeposit = async () => {
    setPaymentStatus('processing')
    setPaymentError('')

    // Docelowo w tym miejscu podłączymy też prawdziwą bramkę płatności
    // (np. Stripe / Przelewy24) — na razie zapisujemy rezerwację jako
    // potwierdzoną od razu po "zapłaceniu" zadatku.
    const { error } = await supabase.from('bookings').insert({
      booking_number: bookingNumber,
      service_id: selectedService.id,
      service_name: selectedService.name,
      service_price: selectedService.price,
      service_duration_minutes: selectedService.durationMinutes,
      booking_date: selectedDate,
      booking_time: selectedTime,
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim() || null,
      deposit_amount: DEPOSIT_AMOUNT,
      status: 'confirmed',
    })

    if (error) {
      setPaymentStatus('idle')
      setPaymentError(
        'Nie udało się zapisać rezerwacji. Sprawdź połączenie i spróbuj ponownie.',
      )
      return
    }

    setPaymentStatus('done')
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedServiceId(null)
    setSelectedDate(null)
    setSelectedTime(null)
    setForm(EMPTY_FORM)
    setTouched(false)
    setPaymentStatus('idle')
    setPaymentError('')
  }

  const visibleServices = SERVICES.filter((service) => service.categoryId === activeCategory)

  if (paymentStatus === 'done') {
    return (
      <div className="rez-page">
        <BookingHeader />

        <main className="rez-success">
          <div className="rez-success-icon">
            <CheckIcon />
          </div>

          <p className="rez-eyebrow">REZERWACJA POTWIERDZONA</p>
          <h1>Do zobaczenia, {form.firstName}!</h1>

          <p className="rez-success-text">
            Zadatek w wysokości {formatPrice(DEPOSIT_AMOUNT)} został zaksięgowany
            (płatność testowa). Potwierdzenie wysłaliśmy na adres {form.email}.
          </p>

          <div className="rez-summary-card">
            <div className="rez-summary-row">
              <span>Numer rezerwacji</span>
              <strong>{bookingNumber}</strong>
            </div>
            <div className="rez-summary-row">
              <span>Usługa</span>
              <strong>{selectedService?.name}</strong>
            </div>
            <div className="rez-summary-row">
              <span>Termin</span>
              <strong>
                {selectedDay?.dayName} {selectedDay?.dayNumber} {selectedDay?.monthName}, {selectedTime}
              </strong>
            </div>
            <div className="rez-summary-row">
              <span>Zadatek</span>
              <strong>{formatPrice(DEPOSIT_AMOUNT)}</strong>
            </div>
          </div>

          <div className="rez-success-actions">
            <Link className="rez-btn rez-btn-secondary" to="/">
              Wróć do strony głównej
            </Link>
            <button className="rez-btn rez-btn-primary" type="button" onClick={resetBooking}>
              Umów kolejną wizytę
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="rez-page">
      <BookingHeader />

      <main className="rez-main">
        <p className="rez-eyebrow">REZERWACJA ONLINE</p>
        <h1>Umów swoją wizytę</h1>

        <Stepper currentStep={step} />

        <div className="rez-panel">

          {/* KROK 1 — USŁUGA */}
          {step === 1 && (
            <section>
              <h2 className="rez-step-title">Wybierz usługę</h2>

              <div className="rez-category-tabs">
                {SERVICE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={`rez-category-tab ${activeCategory === category.id ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="rez-service-list">
                {visibleServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`rez-service-card ${selectedServiceId === service.id ? 'is-selected' : ''}`}
                    onClick={() => handleSelectService(service.id)}
                  >
                    <div className="rez-service-card-main">
                      <strong>{service.name}</strong>
                      <p>{service.description}</p>
                      <span className="rez-service-meta">
                        <ClockIcon /> {formatDuration(service.durationMinutes)}
                      </span>
                    </div>
                    <div className="rez-service-price">{formatPrice(service.price)}</div>
                  </button>
                ))}
              </div>

              {touched && !canGoNext && (
                <p className="rez-error">Wybierz usługę, aby przejść dalej.</p>
              )}
            </section>
          )}

          {/* KROK 2 — DZIEŃ */}
          {step === 2 && (
            <section>
              <h2 className="rez-step-title">Wybierz dzień</h2>
              <p className="rez-step-subtitle">
                Salon czynny od poniedziałku do soboty, 9:00–18:00.
              </p>

              <div className="rez-day-grid">
                {days.map((day) => (
                  <button
                    key={day.isoDate}
                    type="button"
                    disabled={day.isClosed || !day.hasFreeSlots}
                    className={`rez-day-card ${selectedDate === day.isoDate ? 'is-selected' : ''}`}
                    onClick={() => handleSelectDate(day.isoDate)}
                  >
                    <span className="rez-day-name">{day.dayName}</span>
                    <span className="rez-day-number">{day.dayNumber}</span>
                    <span className="rez-day-month">{day.monthName}</span>
                    {(day.isClosed || !day.hasFreeSlots) && (
                      <span className="rez-day-closed">
                        {day.isClosed ? 'Zamknięte' : 'Brak miejsc'}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {touched && !canGoNext && (
                <p className="rez-error">Wybierz dzień, aby przejść dalej.</p>
              )}
            </section>
          )}

          {/* KROK 3 — GODZINA */}
          {step === 3 && (
            <section>
              <h2 className="rez-step-title">Wybierz godzinę</h2>
              <p className="rez-step-subtitle">
                {selectedDay?.dayName} {selectedDay?.dayNumber} {selectedDay?.monthName} ·{' '}
                {selectedService?.name} ({formatDuration(selectedService?.durationMinutes ?? 0)})
              </p>

              <div className="rez-time-grid">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={!slot.available}
                    className={`rez-time-slot ${selectedTime === slot.time ? 'is-selected' : ''}`}
                    onClick={() => setSelectedTime(slot.time)}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              {timeSlots.length === 0 && (
                <p className="rez-step-subtitle">Brak dostępnych godzin dla wybranego dnia.</p>
              )}

              {touched && !canGoNext && (
                <p className="rez-error">Wybierz godzinę, aby przejść dalej.</p>
              )}
            </section>
          )}

          {/* KROK 4 — DANE KONTAKTOWE */}
          {step === 4 && (
            <section>
              <h2 className="rez-step-title">Twoje dane</h2>
              <p className="rez-step-subtitle">Potrzebujemy ich do potwierdzenia rezerwacji.</p>

              <div className="rez-form-grid">
                <label className="rez-field">
                  <span>Imię</span>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={handleFormChange('firstName')}
                    placeholder="Anna"
                  />
                </label>

                <label className="rez-field">
                  <span>Nazwisko</span>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={handleFormChange('lastName')}
                    placeholder="Kowalska"
                  />
                </label>

                <label className="rez-field">
                  <span><PhoneIcon /> Telefon</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={handleFormChange('phone')}
                    placeholder="500 100 200"
                  />
                </label>

                <label className="rez-field">
                  <span><MailIcon /> E-mail</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleFormChange('email')}
                    placeholder="anna@przyklad.pl"
                  />
                </label>

                <label className="rez-field rez-field-wide">
                  <span>Uwagi (opcjonalnie)</span>
                  <textarea
                    value={form.notes}
                    onChange={handleFormChange('notes')}
                    placeholder="Np. alergie, wcześniejsze zabiegi, preferencje."
                    rows={3}
                  />
                </label>
              </div>

              {touched && !canGoNext && (
                <p className="rez-error">Uzupełnij poprawnie wszystkie wymagane pola.</p>
              )}
            </section>
          )}

          {/* KROK 5 — PODSUMOWANIE + ZADATEK */}
          {step === 5 && (
            <section>
              <h2 className="rez-step-title">Podsumowanie</h2>

              <div className="rez-summary-card">
                <div className="rez-summary-row">
                  <span>Usługa</span>
                  <strong>{selectedService?.name}</strong>
                </div>
                <div className="rez-summary-row">
                  <span>Czas trwania</span>
                  <strong>{formatDuration(selectedService?.durationMinutes ?? 0)}</strong>
                </div>
                <div className="rez-summary-row">
                  <span>Termin</span>
                  <strong>
                    {selectedDay?.dayName} {selectedDay?.dayNumber} {selectedDay?.monthName}, {selectedTime}
                  </strong>
                </div>
                <div className="rez-summary-row">
                  <span>Klient</span>
                  <strong>{form.firstName} {form.lastName}</strong>
                </div>
                <div className="rez-summary-row">
                  <span>Kontakt</span>
                  <strong>{form.phone} · {form.email}</strong>
                </div>
                {form.notes && (
                  <div className="rez-summary-row">
                    <span>Uwagi</span>
                    <strong>{form.notes}</strong>
                  </div>
                )}
                <div className="rez-summary-row rez-summary-total">
                  <span>Cena usługi</span>
                  <strong>{formatPrice(selectedService?.price ?? 0)}</strong>
                </div>
                <div className="rez-summary-row rez-summary-total">
                  <span>Zadatek do wpłaty teraz</span>
                  <strong>{formatPrice(DEPOSIT_AMOUNT)}</strong>
                </div>
              </div>

              <p className="rez-payment-note">
                <SparkleIcon /> To jest wizualny krok testowy — żadna prawdziwa
                płatność nie zostanie pobrana. Docelowo w tym miejscu podłączymy
                bramkę płatności (np. Stripe lub Przelewy24).
              </p>

              <button
                type="button"
                className="rez-btn rez-btn-primary rez-pay-btn"
                onClick={handlePayDeposit}
                disabled={paymentStatus === 'processing'}
              >
                {paymentStatus === 'processing'
                  ? 'Przetwarzanie płatności…'
                  : `Zapłać zadatek ${formatPrice(DEPOSIT_AMOUNT)} i potwierdź`}
              </button>

              {paymentError && <p className="rez-error">{paymentError}</p>}
            </section>
          )}

          {/* NAWIGACJA */}
          {step < 5 && (
            <div className="rez-nav-buttons">
              <button
                type="button"
                className="rez-btn rez-btn-ghost"
                onClick={goBack}
                disabled={step === 1}
              >
                <ArrowLeftIcon /> Wstecz
              </button>

              <button
                type="button"
                className="rez-btn rez-btn-primary"
                onClick={goNext}
              >
                Dalej <ArrowRightIcon />
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="rez-nav-buttons">
              <button
                type="button"
                className="rez-btn rez-btn-ghost"
                onClick={goBack}
                disabled={paymentStatus === 'processing'}
              >
                <ArrowLeftIcon /> Wstecz
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

function BookingHeader() {
  return (
    <header className="rez-header">
      <Link className="rez-brand" to="/">
        <img src={logo} alt="Pink Beauty Med" />
      </Link>

      <Link className="rez-back-link" to="/">
        <ArrowLeftIcon /> Strona główna
      </Link>
    </header>
  )
}

function Stepper({ currentStep }) {
  return (
    <div className="rez-stepper">
      {STEPS.map((item, index) => {
        const isDone = item.id < currentStep
        const isActive = item.id === currentStep

        return (
          <div className="rez-stepper-item" key={item.id}>
            <div className={`rez-stepper-dot ${isDone ? 'is-done' : ''} ${isActive ? 'is-active' : ''}`}>
              {isDone ? <CheckIcon /> : item.id}
            </div>
            <span className={`rez-stepper-label ${isActive ? 'is-active' : ''}`}>
              {item.label}
            </span>
            {index < STEPS.length - 1 && (
              <div className={`rez-stepper-line ${isDone ? 'is-done' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Booking