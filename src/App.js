import Layout from './components/layout'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import { Routes, Route } from 'react-router-dom'
import Service from './pages/service'
import Team from './pages/team'
import About from './pages/about'
import Project from './pages/project'
import { useEffect, useState } from 'react'
import Profile from './pages/profile'
import jwt_decode from 'jwt-decode'
import ProtectedRoute from './components/protected-route'
import Settings from './pages/settings'
import Users from './pages/users'
import Appointmentstable from './pages/appointmentsTable'
import Book from './pages/Book/Book'
import Admin from './pages/Admin'
import AppointmentDetails from './components/AppointmentDetails'
import CompleteAppointment from './components/CompleteAppointment'
import Account from './pages/Account'
import Appointments from './components/Appointments'

function App() {
  const [user, setUser] = useState(
    localStorage.getItem('jwt') != null
      ? jwt_decode(localStorage.getItem('jwt'))
      : ''
  )
  useEffect(() => {
    if (localStorage.getItem('jwt') != null && !user)
      setUser(jwt_decode(localStorage.getItem('jwt')))
  }, [user])
  return (
    <Layout user={user} setUser={setUser}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!user}>
              <Login setUser={setUser} />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isAllowed={!user}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path="/services" element={<Service />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <Appointmentstable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-appointment/:id"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <CompleteAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book"
          element={
            <ProtectedRoute isAllowed={!!user} redirectPath={'/login'}>
              <Book />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={!!user} redirectPath={'/login'}>
              <Profile {...user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute
              isAllowed={
                !!user &&
                (user.role === 'admin' ||
                  user.role === 'dentist' ||
                  user.role === 'assistant')
              }
              redirectPath={'/profile'}
            >
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/:id"
          element={<AppointmentDetails userId={user.id} userRole={user.role} />}
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAllowed={!!user}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  )
}

export default App
