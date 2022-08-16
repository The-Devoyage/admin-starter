import { gql } from '@apollo/client';

export const USERS_PAGE_CREATE_USER = gql`
  mutation UsersPage_CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
    }
  }
`;
