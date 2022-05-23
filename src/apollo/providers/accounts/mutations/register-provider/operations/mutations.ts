import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation RegisterProvider_Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      _id
    }
  }
`;
