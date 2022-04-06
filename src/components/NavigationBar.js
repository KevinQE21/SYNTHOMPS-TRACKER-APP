import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar, Container} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

import { FaVirus } from 'react-icons/fa';

function NavigationBar(){
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    async function handleLogout(e){
        e.preventDefault();

        try {
            await logout();
            navigate('/');
        }
        catch (e){
            console.log(e);
        }
    }
        
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand as={Link} to="/"><FaVirus /> Synthomps Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                            currentUser
                            ?
                            <> 
                            <Nav.Link as={ Link } to="/profile">Profile </Nav.Link>  
                            <Nav.Link as={ Link } to="/" onClick={handleLogout}> Logout</Nav.Link>
                            </>                    
                            :
                            <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
                            </>
                        }
                    </Nav>  
                </Navbar.Collapse>                              
            </Container>
        </Navbar>
    );
}

export default NavigationBar;