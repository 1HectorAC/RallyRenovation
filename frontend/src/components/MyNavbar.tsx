import type React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


const MyNavbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">Rally Renovation</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/Renovations">Browse</Nav.Link>
            {isAuthenticated && (
              <span>
                  <Nav.Link as={Link} to="/Dashboard">Dashboard</Nav.Link>

              </span>
            )}
          </Nav>
          <Nav>
            {user && (
              <span>
                <div style={{display:'inline'}} >{user.email}</div>
                <Nav.Link style={{display:'inline'}}  onClick={handleLogout}>Logout</Nav.Link>
              </span>

            )}
            {!isAuthenticated && (
              <span>
                <Nav.Link style={{display:'inline'}}  as={Link} to="/Register">Register</Nav.Link>
                <Nav.Link style={{display:'inline'}}  as={Link} to="/Login">Login</Nav.Link>
              </span>

            )}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar;