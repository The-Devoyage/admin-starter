import { gql } from '@apollo/client';

export const LOGIN_PAGE_LOGIN = gql`
  mutation LoginPage_Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
      account {
        _id
        email
      }
    }
  }
`;

export const LOGIN_PAGE_LOGIN_USER = gql`
  mutation LoginPage_LoginUser {
    loginUser {
      token
      user {
        _id
      }
    }
  }
`;
