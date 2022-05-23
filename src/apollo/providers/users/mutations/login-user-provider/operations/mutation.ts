import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation LoginProvider_LoginUser {
    loginUser {
      token
      user {
        _id
      }
    }
  }
`;
