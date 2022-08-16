import { gql } from '@apollo/client';

export const USER_PAGE_UPDATE_USER = gql`
  mutation UserPage_UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      email
      first_name
      last_name
      about
      address {
        city
        lineTwo
        lineOne
        state
        zip
      }
      phone
      image {
        _id
        path
        title
      }
    }
  }
`;

export const USER_PAGE_UPDATE_USER_MEMBERSHIP = gql`
  mutation UserPage_UpdateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      email
      first_name
      last_name
      about
      address {
        city
        lineTwo
        lineOne
        state
        zip
      }
      phone
      image {
        _id
        path
        title
      }
    }
  }
`;

export const USER_PAGE_INVITE_USER = gql`
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
