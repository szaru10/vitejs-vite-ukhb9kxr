import { Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import Gallery from './pages/Gallery.jsx'
import Booking from './pages/Booking.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPanel from './pages/AdminPanel.jsx'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/rezerwacja" element={<Booking />} />
        <Route path="/panel/logowanie" element={<AdminLogin />} />
        <Route
          path="/panel"
          element={(
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          )}
        />
      </Routes>
    </AuthProvider>
  )
}

export default App