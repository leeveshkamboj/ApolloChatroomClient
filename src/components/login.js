import React, { useState, useContext } from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LOGIN_MUTATION } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

export default function Login() {
  const history = useHistory();
  const context = useContext(AuthContext);
  if (context.user) {
    history.push("/");
  }
  const [values, setValues] = useState({ username: "", pass: "" });
  const [errors, setErrors] = useState({});
  const [login, { loading, data }] = useMutation(LOGIN_MUTATION, {
    update(_, { data: { login: data } }) {
      context.login(data);
      history.push("/");
    },
    variables: {
      loginUsername: values.username,
      loginPassword: values.pass,
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
    login();
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

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="pass"
            type="password"
            placeholder="Password"
            onChange={onChange}
            isInvalid={errors && errors.password ? true : false}
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
            "Login"
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
