import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { GET_UNREAD } from "../graphql/queries";

export default function MenuBar(props) {
  const history = useHistory();
  const { user, logout } = useContext(AuthContext);
  function onLogout() {
    logout();
    history.push("/");
  }

  const { data } = useQuery(GET_UNREAD
    ,{pollInterval: 1000});

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chatify
          </Navbar.Brand>
          <Nav>
            <Button as={Link} to="/about">
              About
            </Button>
            {user ? (
              <>
                <Button as={Link} to="/chat">
                  Contacts
                  {data && data.getContacts.unread !== 0 && (
                    <div className="notification-badge">
                      {data.getContacts.unread}
                    </div>
                  )}
                </Button>

                <Button onClick={onLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login">
                  Login
                </Button>
                <Button as={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
