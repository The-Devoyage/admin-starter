import { gql } from '@apollo/client';

export const ACCOUNT_PAGE_RESET_ACTIVATION_CODE = gql`
  mutation AccountPage_ResetActivationCode($resetCodeInput: ResetCodeInput!) {
    resetActivationCode(resetCodeInput: $resetCodeInput) {
      _id
    }
  }
`;
