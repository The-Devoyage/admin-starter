import { gql } from '@apollo/client';

export const ACCOUNT_PAGE_RESET_ACTIVATION_CODE = gql`
  mutation AccountPage_ResetActivationCode($resetCodeInput: ResetCodeInput!) {
    resetActivationCode(resetCodeInput: $resetCodeInput) {
      _id
    }
  }
`;

export const ACCOUNT_PAGE_INVITE_USER = gql`
  mutation UsersPage_InviteUser($inviteUserInput: InviteUserInput!) {
    inviteUser(inviteUserInput: $inviteUserInput) {
      _id
      first_name
      memberships {
        role
        status
        _id
        account {
          _id
        }
      }
    }
  }
`;

export const ACCOUNT_PAGE_CREATE_USER = gql`
  mutation AccountPage_CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;
