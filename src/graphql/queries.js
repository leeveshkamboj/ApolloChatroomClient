import { gql } from "@apollo/client";

const GET_MESSAGE_QUERRY = gql`
  query Query {
    getMessages {
      id
      username
      body
      createdAt
    }
  }
`;

const GET_PM_QUERRY = gql`
  query Query($getPmsUsername: String!) {
    getPms(username: $getPmsUsername) {
      id
      username
      seen
      createdAt
      body
    }
  }
`;

const GET_CONTACT = gql`
  query Query {
    getContacts {
      username
      lastMessageUsername
      lastMessage
      lastMessageAt
    }
  }
`;

export { GET_MESSAGE_QUERRY, GET_PM_QUERRY, GET_CONTACT };
