import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom";

// Define types for props
interface NavBarProps {
  appName: string;
  pages: { path: string; label: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ appName, pages }) => {
  const location = useLocation(); // Use useLocation hook to get the current location

  // Function to determine if the current page is active
  const isActive = (path: string) => location.pathname === path;

  const expand = "sm"; // Set the expand breakpoint to large

  return (
    <Navbar key={expand} expand={expand} data-bs-theme="dark" bg="primary" className="mb-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {appName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              {pages.map((page, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={page.path}
                  active={isActive(page.path)}
                  className={isActive(page.path) ? "active" : ""}
                >
                  {page.label}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
