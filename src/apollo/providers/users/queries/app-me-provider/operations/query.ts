import { gql } from '@apollo/client';

export const APP_ME = gql`
  query App_Me {
    me {
      _id
      first_name
      last_name
      email
      image {
        path
      }
    }
  }
`;
