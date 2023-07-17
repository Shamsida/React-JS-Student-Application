import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=> navigate('/')}>Student Data</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate('/studentdata')}>Data</Nav.Link>
            <Nav.Link onClick={()=> navigate('/')}>Form</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;