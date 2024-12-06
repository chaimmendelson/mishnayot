import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCopyright } from "@fortawesome/free-solid-svg-icons";

// Define types for props
interface NavBarProps {
  appName: string;
  pages: { path: string; label: string }[];
}

const NavBar: React.FC<NavBarProps> = ({ appName, pages }) => {
  const location = useLocation(); // Use useLocation hook to get the current location

  // Function to determine if the current page is active
  const isActive = (path: string) => location.pathname === path;

  // Clock state
  const [time, setTime] = useState<string>("");

  // Function to update the clock
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    setTime(`${hours}:${minutes}:${seconds}`);
  };

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(updateClock, 1000);
    updateClock(); // Call it initially to set the time
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const expand = "md"; // Set the expand breakpoint to large

  return (
    <Navbar
      key={expand}
      expand={expand}
      data-bs-theme="dark"
      bg="primary"
      className="mb-3"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {appName}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
          bg="dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-${expand}`}
            ></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-2 pe-3">
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
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Item className="fs-5 fw-bold">
                <FontAwesomeIcon icon={faClock} /> {time}
              </Nav.Item>
            </Nav>
            
            <Nav className="justify-content-center flex-grow-2 pe-3">
            <Nav.Link className="fs-6">
                <FontAwesomeIcon icon={faCopyright} />
                <span> אלי שוחט</span>
                <span> X </span>
                <span> חיים מנדלסון</span>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;
