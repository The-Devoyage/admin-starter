import { gql } from '@apollo/client';

export const REGISTER_PAGE_REGISTER_ACCOUNT = gql`
  mutation RegisterPage_RegisterAccount($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      _id
    }
  }
`;
