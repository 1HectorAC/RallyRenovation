
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {

  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Renovations" element={<BrowseRenovation />} />
        <Route path="/Renovation" element={<Renovation />} />
        <Route path="/Dashboard" element={<UserDashboard />} />
        <Route path="/RenovationDashboard" element={<RenovationDashboard />} />
        <Route path="/RenovationCreate" element={<CreateRenovation />} />
        <Route path="/RenovationEdit" element={<EditRenovation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
