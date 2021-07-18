import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation login($loginUsername: String!, $loginPassword: String!) {
    login(username: $loginUsername, password: $loginPassword) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation RegisterMutation(
    $registerEmail: String!
    $registerPassword: String!
    $registerConfirmPassword: String!
    $registerUsername: String!
  ) {
    register(
      email: $registerEmail
      password: $registerPassword
      confirmPassword: $registerConfirmPassword
      username: $registerUsername
    ) {
      email
    }
  }
`;

const VERIFY_EMAIL_MUTATION = gql`
  mutation VerifyEmailMutation($verifyEmailToken: String!) {
    verifyEmail(token: $verifyEmailToken) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation postmessgae($postMessageBody: String!) {
    postMessage(body: $postMessageBody) {
      id
      username
      body
      createdAt
    }
  }
`;

const SEND_PM = gql`
  mutation PostPmMutation($postPmUsername: String!, $postPmBody: String!) {
    postPm(username: $postPmUsername, body: $postPmBody) {
      id
      username
      createdAt
      body
      seen
    }
  }
`;

export {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  VERIFY_EMAIL_MUTATION,
  SEND_MESSAGE,
  SEND_PM,
};
