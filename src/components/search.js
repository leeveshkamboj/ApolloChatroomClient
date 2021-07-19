import React, { useState, useContext } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { SEARCH_USER_MUTATION } from "../graphql/mutations";

export default function Search() {
  const history = useHistory();
  const context = useContext(AuthContext);
  if (!context.user) {
    history.push("/");
  }
  const [values, setValues] = useState({ username: "" });
  const [errors, setErrors] = useState({});
  const [search, { loading, data }] = useMutation(SEARCH_USER_MUTATION, {
    update(_, result) {
      history.push(`chat/${values.username}`);
    },
    variables: {
      searchUsername: values.username,
    },
    onError: (err) => {
      if (err.graphQLErrors.length > 0) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      } else if (err.networkError) {
        setErrors({ server: "Server Offline." });
      } else {
        console.log(err);
        setErrors({ server: "Something went wrong." });
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    search();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={onChange}
            isInvalid={errors && errors.username ? true : false}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Search"
          )}
        </Button>
      </Form>
      <br />
      {!loading && !data && Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.values(errors).map((value) => (
            <li>{value}</li>
          ))}
        </Alert>
      )}
    </div>
  );
}
