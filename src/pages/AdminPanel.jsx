import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './Admin.css'

import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext.jsx'
import { supabase } from '../supabaseClient.js'

const STATUS_LABELS = {
  confirmed: 'Potwierdzona',
  completed: 'Zakończona',
  cancelled: 'Anulowana',
}

const FILTERS = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'confirmed', label: 'Potwierdzone' },
  { id: 'completed', label: 'Zakończone' },
  { id: 'cancelled', label: 'Anulowane' },
]

function formatPrice(value) {
  return `${Number(value).toFixed(0)} zł`
}

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day}.${month}.${year}`
}

function isToday(isoDate) {
  const today = new Date()
  const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  return isoDate === todayIso
}

function AdminPanel() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [pendingId, setPendingId] = useState(null)

  const loadBookings = async () => {
    setIsLoading(true)
    setLoadError('')

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('booking_date', { ascending: true })
      .order('booking_time', { ascending: true })

    if (error) {
      setLoadError('Nie udało się wczytać rezerwacji. Spróbuj odświeżyć stronę.')
      setIsLoading(false)
      return
    }

    setBookings(data ?? [])
    setIsLoading(false)
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const stats = useMemo(() => {
    const active = bookings.filter((booking) => booking.status !== 'cancelled')
    const todayCount = bookings.filter(
      (booking) => isToday(booking.booking_date) && booking.status !== 'cancelled',
    ).length
    const depositRevenue = active.reduce(
      (sum, booking) => sum + Number(booking.deposit_amount ?? 0),
      0,
    )

    return {
      total: bookings.length,
      confirmed: bookings.filter((booking) => booking.status === 'confirmed').length,
      completed: bookings.filter((booking) => booking.status === 'completed').length,
      cancelled: bookings.filter((booking) => booking.status === 'cancelled').length,
      todayCount,
      depositRevenue,
    }
  }, [bookings])

  const visibleBookings = useMemo(() => {
    if (activeFilter === 'all') return bookings
    return bookings.filter((booking) => booking.status === activeFilter)
  }, [bookings, activeFilter])

  const handleStatusChange = async (bookingId, nextStatus) => {
    setPendingId(bookingId)

    const { error } = await supabase
      .from('bookings')
      .update({ status: nextStatus })
      .eq('id', bookingId)

    if (!error) {
      setBookings((current) =>
        current.map((booking) =>
          booking.id === bookingId ? { ...booking, status: nextStatus } : booking,
        ),
      )
    }

    setPendingId(null)
  }

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm('Na pewno chcesz trwale usunąć tę rezerwację?')
    if (!confirmed) return

    setPendingId(bookingId)

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId)

    if (!error) {
      setBookings((current) => current.filter((booking) => booking.id !== bookingId))
    }

    setPendingId(null)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/panel/logowanie')
  }

  return (
    <div className="adm-page">
      <header className="adm-header">
        <Link className="adm-brand" to="/">
          <img src={logo} alt="Pink Beauty Med" />
        </Link>

        <div className="adm-header-right">
          {user?.email && <span className="adm-user-email">{user.email}</span>}
          <button type="button" className="adm-btn adm-btn-ghost" onClick={handleSignOut}>
            Wyloguj
          </button>
        </div>
      </header>

      <main className="adm-main">
        <p className="adm-eyebrow">PANEL ADMINISTRACYJNY</p>
        <h1>Rezerwacje</h1>

        {/* STATYSTYKI */}
        <div className="adm-stats-grid">
          <div className="adm-stat-card">
            <span className="adm-stat-value">{stats.total}</span>
            <span className="adm-stat-label">Wszystkich rezerwacji</span>
          </div>

          <div className="adm-stat-card">
            <span className="adm-stat-value">{stats.todayCount}</span>
            <span className="adm-stat-label">Dziś</span>
          </div>

          <div className="adm-stat-card">
            <span className="adm-stat-value">{stats.confirmed}</span>
            <span className="adm-stat-label">Potwierdzonych</span>
          </div>

          <div className="adm-stat-card">
            <span className="adm-stat-value">{stats.cancelled}</span>
            <span className="adm-stat-label">Anulowanych</span>
          </div>

          <div className="adm-stat-card adm-stat-card-highlight">
            <span className="adm-stat-value">{formatPrice(stats.depositRevenue)}</span>
            <span className="adm-stat-label">Przychód z zadatków</span>
          </div>
        </div>

        {/* FILTRY */}
        <div className="adm-filters">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`adm-filter-tab ${activeFilter === filter.id ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* LISTA */}
        {isLoading && <p className="adm-info-text">Wczytywanie rezerwacji…</p>}

        {loadError && <p className="adm-error">{loadError}</p>}

        {!isLoading && !loadError && visibleBookings.length === 0 && (
          <p className="adm-info-text">Brak rezerwacji w tej kategorii.</p>
        )}

        {!isLoading && visibleBookings.length > 0 && (
          <div className="adm-booking-list">
            {visibleBookings.map((booking) => (
              <div className="adm-booking-card" key={booking.id}>
                <div className="adm-booking-main">
                  <div className="adm-booking-top">
                    <span className={`adm-status-badge adm-status-${booking.status}`}>
                      {STATUS_LABELS[booking.status] ?? booking.status}
                    </span>
                    <span className="adm-booking-number">{booking.booking_number}</span>
                  </div>

                  <strong className="adm-booking-service">{booking.service_name}</strong>

                  <div className="adm-booking-meta">
                    <span>
                      {formatDate(booking.booking_date)} · {booking.booking_time}
                    </span>
                    <span>{booking.first_name} {booking.last_name}</span>
                    <span>{booking.phone} · {booking.email}</span>
                  </div>

                  {booking.notes && (
                    <p className="adm-booking-notes">Uwagi: {booking.notes}</p>
                  )}
                </div>

                <div className="adm-booking-side">
                  <div className="adm-booking-price">
                    <span>Zadatek</span>
                    <strong>{formatPrice(booking.deposit_amount)}</strong>
                  </div>

                  <div className="adm-booking-actions">
                    <select
                      className="adm-status-select"
                      value={booking.status}
                      disabled={pendingId === booking.id}
                      onChange={(event) => handleStatusChange(booking.id, event.target.value)}
                    >
                      <option value="confirmed">Potwierdzona</option>
                      <option value="completed">Zakończona</option>
                      <option value="cancelled">Anulowana</option>
                    </select>

                    <button
                      type="button"
                      className="adm-btn adm-btn-danger"
                      disabled={pendingId === booking.id}
                      onClick={() => handleDelete(booking.id)}
                    >
                      Usuń
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminPanel