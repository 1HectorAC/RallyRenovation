
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BrowseRenovation from './pages/BrowseRenovations'
import UserDashboard from './pages/UserDashboard'
import RenovationDashboard from './pages/RenovationDashboard'
import CreateRenovation from './pages/CreateRenovation'
import EditRenovation from './pages/EditRenovation'
import Renovation from './pages/Renovation'
import MyNavbar from './components/MyNavbar'
import { useAuth } from './hooks/useAuth'
import Message from './pages/Message'
import Liked from './pages/Liked'

function App() {
  const {isAuthenticated} = useAuth();

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Renovations" element={<BrowseRenovation />} />
        <Route path="/Renovation" element={<Renovation />} />

        <Route path="/Dashboard" element={isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />} />
        <Route path="/RenovationDashboard" element={isAuthenticated ? <RenovationDashboard /> : <Navigate to="/login" />} />
        <Route path="/RenovationCreate" element={isAuthenticated ? <CreateRenovation /> : <Navigate to="/login" />} />
        <Route path="/RenovationEdit" element={isAuthenticated ? <EditRenovation /> : <Navigate to="/login" />} />
        <Route path="/Messages" element={isAuthenticated ? <Message /> : <Navigate to="/login" />} />
        <Route path="/Liked" element={isAuthenticated ? <Liked /> : <Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
