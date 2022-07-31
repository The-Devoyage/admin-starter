import { gql } from '@apollo/client';

export const RESET_PASSWORD_PAGE_RESET_PASSWORD = gql`
  mutation ResetPasswordPage_ResetPassword($resetInput: ResetPasswordInput!) {
    resetPassword(resetInput: $resetInput) {
      _id
    }
  }
`;
