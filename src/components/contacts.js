import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { PersonPlusFill } from "react-bootstrap-icons";

import { GET_CONTACT } from "../graphql/queries";
import { AuthContext } from "../context/auth";

export default function Contacts() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  if (!user) {
    history.push("/");
  }
  const [errors, setErrors] = useState([]);
  const { loading, data } = useQuery(GET_CONTACT, {
    onError: (err) => {
      if (err.networkError) {
        setErrors({ server: "Server Offline." });
      } else {
        setErrors({ server: "Something went wrong" });
        console.log(err);
      }
    },
    pollInterval: 3000,
  });
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    if (data) {
      setContacts(data.getContacts.contacts);
      // console.log(data);
    }
  }, [data]);
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const colors = [
    "#007bff",
    "#28a745",
    "#dc3545",
    " #ffc107",
    "#17a2b8",
    "#343a40",
  ];
  return (
    <>
      <div className="contacts-heading">
        <h3 style={{ float: "left" }}>My Contacts</h3>
        <Link to={"/search"}>
          <div className="contacts-add-button">
            {" "}
            <PersonPlusFill className="contacts-add-icon" />
          </div>
        </Link>
      </div>
      <br />
      <br />
      <br />
      {contacts && Object.keys(contacts).length > 0 && (
        <div className="contacts-con">
          {user && loading ? (
            <div className="loadingMessages">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            Object.values(contacts).map((value) => (
              <>
                <Link to={`chat/${value.username}`}>
                  <div className="contacts-back">
                    <div
                      className="contacts-photo"
                      style={{
                        background: colors[getRndInteger(0, colors.length - 1)],
                      }}
                    >
                      {value.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="contacts-info">
                      <div className="contacts-name">{value.username}</div>
                      <div className="contacts-last-message">
                        {value.lastMessage}
                      </div>
                    </div>
                    {value.username === value.lastMessageUsername &&
                      !value.lastMessageSeen && (
                        <div className="new-badge">New</div>
                      )}
                  </div>
                </Link>
              </>
            ))
          )}
        </div>
      )}
      {Object.keys(errors).length > 0 ? (
        <div className="no-contact">{errors.server}</div>
      ) : (
        Object.keys(contacts).length === 0 && (
          <div className="no-contact">No contacts.</div>
        )
      )}
    </>
  );
}
