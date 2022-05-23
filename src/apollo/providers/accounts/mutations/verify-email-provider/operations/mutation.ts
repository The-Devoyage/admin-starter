import { gql } from '@apollo/client';

export const VERIFY_EMAIL = gql`
  mutation VerifyEmailProvider_VerifyEmail(
    $verifyEmailInput: VerifyEmailInput!
  ) {
    verifyEmail(verifyEmailInput: $verifyEmailInput) {
      _id
    }
  }
`;
