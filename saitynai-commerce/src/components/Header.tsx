import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    const role = localStorage['role']
    
    function handleSignOut() {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Detection</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/catalog">Catalog</Nav.Link>
                        {role == "admin" &&
                            <Nav.Link href="/admin">Admin Panel</Nav.Link>
                        }
                    </Nav>
                    <Nav>
                        {!role &&
                            <Nav.Link href="/login">Sign in</Nav.Link>
                        }
                        {role && 
                            <>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      );
    /*
    return <nav className="navvy navbar navbar-expand-lg">
        <a href="/" className="site-title">Detekcija</a>
        <ul>
            {role == "admin" && 
                <li>
                    <a href="/admin">Admin Panel</a>
                </li>
            }
            <li>
                <a href="/catalog" >Catalog</a>
            </li>
            <li>
                <a href="/contacts">Contacts</a>
            </li>
            {role && ( //role is set      //<img src={picture} referrerPolicy="no-referrer" height={30}/>      
            <li>    
                <a href="/profile">Profile</a>            
                
            </li>
            )}
            {role ? ( //role is set           
            <li>    
                <a onClick={handleSignOut}>Sign out</a>
            </li>
            ) : ( // role is not set
            <li>                
                <a href="login">Sign In</a>
            </li>    
            )}
        </ul>
    </nav>*/
}