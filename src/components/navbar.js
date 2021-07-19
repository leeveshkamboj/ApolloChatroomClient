import React, { useContext } from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { GET_UNREAD } from "../graphql/queries";

export default function MenuBar() {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  function onLogout() {
    logout();
    history.push("/");
  }
  const { data } = useQuery(GET_UNREAD);
  console.log(data);
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
              <>
                <Nav.Link as={Link} to="/chat">
                  Contacts
                  {data && data.getContacts.unread !== 0 && (
                    <Badge bg="secondary">{data.getContacts.unread}</Badge>
                  )}
                </Nav.Link>

                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
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
