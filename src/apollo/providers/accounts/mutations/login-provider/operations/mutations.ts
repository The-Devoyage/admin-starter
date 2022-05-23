import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation LoginProvider_Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      account {
        _id
        email
      }
    }
  }
`;
