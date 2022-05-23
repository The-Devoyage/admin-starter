import { gql } from '@apollo/client';

export const USERS_PAGE_INVITE_USER = gql`
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
