import { gql } from '@apollo/client';

export const USER_PAGE_DELETE_USER = gql`
  mutation UserPage_DeleteUser($deleteUserInput: DeleteUserInput!) {
    deleteUser(deleteUserInput: $deleteUserInput) {
      _id
    }
  }
`;
