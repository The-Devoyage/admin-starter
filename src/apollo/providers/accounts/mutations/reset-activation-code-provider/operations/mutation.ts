import { gql } from '@apollo/client';

export const RESET_ACTIVATION_CODE = gql`
  mutation ResetActivationCodeProvider_ResetActivationCode(
    $resetCodeInput: ResetCodeInput!
  ) {
    resetActivationCode(resetCodeInput: $resetCodeInput) {
      _id
    }
  }
`;
