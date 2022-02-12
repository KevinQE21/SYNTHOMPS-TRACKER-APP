import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link, Outlet } from 'react-router-dom'

function NavigationBar(){
    return(
            <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
            <Navbar.Brand as={Link} to="/">Synthomps Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>    
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Navbar.Text>
                    email@domain.com
                </Navbar.Text>
                </Nav>
            </Navbar.Collapse>
            </Container>
            <Outlet />
            </Navbar>
        );
}

export default NavigationBar;