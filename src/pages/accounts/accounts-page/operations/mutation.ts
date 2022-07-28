import { gql } from '@apollo/client';

export const ACCOUNTS_PAGE_REGISTER_ACCOUNT = gql`
  mutation AccountsPage_RegisterAccount($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      _id
    }
  }
`;
