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

const NEW_PM_SUBSCRIPTION = gql`
  subscription Subscription(
    $pmCreatedToken: String!
    $pmCreatedUsername: String!
  ) {
    pmCreated(token: $pmCreatedToken, username: $pmCreatedUsername) {
      id
      username
      body
      createdAt
      seen
    }
  }
`;

const SEEN_SUBSCRIPTION = gql`
  subscription Subscription {
    pmSeenSub
  }
`;

export { NEW_MESSAGE_SUBSCRIPTION, NEW_PM_SUBSCRIPTION, SEEN_SUBSCRIPTION };
