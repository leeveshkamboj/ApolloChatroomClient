import React, { useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chatify
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {user ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
