import { gql } from "@apollo/client";

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription Subscription {
    messageCreated {
      id
      username
      body
      createdAt
    }
  }
`;

export { NEW_MESSAGE_SUBSCRIPTION };
