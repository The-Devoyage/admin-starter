import { gql } from '@apollo/client';

export const USER_PAGE_DELETE_USER = gql`
  mutation UserPage_DeleteUser($deleteUsersInput: DeleteUsersInput!) {
    deleteUsers(deleteUsersInput: $deleteUsersInput) {
      deletedCount
    }
  }
`;
