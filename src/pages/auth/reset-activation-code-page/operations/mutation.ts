import { gql } from '@apollo/client';

export const RESET_ACTIVATION_CODE_PAGE_RESET_ACTIVATION_CODE = gql`
  mutation ResetActivationCodePage_ResetActivationCode(
    $resetCodeInput: ResetCodeInput!
  ) {
    resetActivationCode(resetCodeInput: $resetCodeInput) {
      _id
    }
  }
`;
