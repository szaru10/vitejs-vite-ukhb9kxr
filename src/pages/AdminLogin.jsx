import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import './Admin.css'

import logo from '../assets/logo.png'
import { useAuth } from '../context/AuthContext.jsx'

function AdminLogin() {
  const { isAuthenticated, isLoading, signIn } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/panel" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const { error: signInError } = await signIn(email.trim(), password)

    setIsSubmitting(false)

    if (signInError) {
      setError('Nieprawidłowy e-mail lub hasło.')
      return
    }

    navigate('/panel')
  }

  return (
    <div className="adm-page adm-page-center">
      <div className="adm-login-card">
        <img className="adm-login-logo" src={logo} alt="Pink Beauty Med" />

        <p className="adm-eyebrow">PANEL ADMINISTRACYJNY</p>
        <h1>Zaloguj się</h1>

        <form className="adm-login-form" onSubmit={handleSubmit}>
          <label className="adm-field">
            <span>E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="adm-field">
            <span>Hasło</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error && <p className="adm-error">{error}</p>}

          <button
            type="submit"
            className="adm-btn adm-btn-primary adm-login-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logowanie…' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin