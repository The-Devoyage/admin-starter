import { gql } from '@apollo/client';

export const RESET_PASSWORD = gql`
  mutation ResetPasswordProvider_ResetPassword(
    $resetInput: ResetPasswordInput!
  ) {
    resetPassword(resetInput: $resetInput) {
      _id
    }
  }
`;
