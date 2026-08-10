import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif',
        color: '#877a7f',
        fontSize: 13,
      }}
      >
        Wczytywanie…
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/panel/logowanie" replace />
  }

  return children
}

export default ProtectedRoute