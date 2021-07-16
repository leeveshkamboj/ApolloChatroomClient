import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Alert, Spinner } from "react-bootstrap";

import { VERIFY_EMAIL_MUTATION } from "../graphql/mutations";
import { AuthContext } from "../context/auth";

export default function Verify() {
  const [checking, setChecking] = useState(false);
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [verify, { loading, data }] = useMutation(VERIFY_EMAIL_MUTATION, {
    update(_, { data: { verifyEmail } }) {
      console.log(verifyEmail);
      context.login(verifyEmail);
      history.push("/");
    },
    onError: (err) => {
      if (err.networkError) {
        setErrors({ server: "Server Offline." });
      }
      else  if (err.message) {
        setErrors(err.message);
      } else {
        console.log(err);
        setErrors({ server: "Something went wrong." });
      }
    },
  });
  const re = /verify\/(.*)/i;
  const check = window.location.pathname.match(re);
  if (check) {
    if (!checking) {
      setChecking(true);
      verify({
        variables: {
          verifyEmailToken: check[1],
        },
      });
    }
  }

  return (
    <div>
      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {!loading && !data && Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.keys(errors).length > 1 ? (
            <li>{errors}</li>
          ) : (
            Object.values(errors).map((value) => <li>{value}</li>)
          )}
        </Alert>
      )}
    </div>
  );
}
