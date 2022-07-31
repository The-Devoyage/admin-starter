import { gql } from '@apollo/client';

export const VERIFY_EMAIL_PAGE_VERIFY_EMAIL = gql`
  mutation VerifyEmailPage_VerifyEmail($verifyEmailInput: VerifyEmailInput!) {
    verifyEmail(verifyEmailInput: $verifyEmailInput) {
      _id
    }
  }
`;
