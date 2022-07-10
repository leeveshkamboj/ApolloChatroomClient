import React, { useState, useContext } from "react";
import { Form, Button, Modal, Alert, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REGISTER_MUTATION } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

export default function Register() {
  const history = useHistory();
  const context = useContext(AuthContext);
  if (context.user) {
    history.push("/");
  }
  const [values, setValues] = useState({
    email: "",
    username: "",
    pass: "",
    confirmPass: "",
  });
  const [errors, setErrors] = useState({});
  const [register, { loading, data }] = useMutation(REGISTER_MUTATION, {
    variables: {
      registerEmail: values.email,
      registerPassword: values.pass,
      registerConfirmPassword: values.confirmPass,
      registerUsername: values.username,
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
    register();
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

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="text"
            placeholder="Enter email"
            onChange={onChange}
            isInvalid={errors && errors.email ? true : false}
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

        <Form.Group controlId="formBasicconfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name="confirmPass"
            type="password"
            placeholder="Password"
            onChange={onChange}
            isInvalid={errors && errors.confirmPassword ? true : false}
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
            "Register"
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
      {data && console.log(data)}
      {data && (
        <Modal show>
          <Modal.Header>
            <Modal.Title>Verify your email</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We have sent you a verification link to {data.register.email}.
            Please check your email and click on the link provided.
            If you can't find the mail please check spam folder. Contact support@chatify.tech for futher information.
          
            Note: Account is auto verified for testing purpose.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" as={Link} to="/">
              Okay
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
