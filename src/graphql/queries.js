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

export { GET_MESSAGE_QUERRY };
