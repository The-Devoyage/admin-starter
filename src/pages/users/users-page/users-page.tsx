import { Providers } from 'src/apollo';
import { UsersList } from 'src/components/users';
import { CreateUserModal } from 'src/components/users/create-user-modal';

const UsersPage = () => (
  <Providers.Users.Queries.UsersPageProvider
    getUsersInput={{ query: {}, config: { pagination: { limit: 10 } } }}
  >
    <Providers.Users.Mutations.CreateUserProvider
      createUserInput={{ payload: { email: '' } }}
    >
      <>
        <UsersList />
        <CreateUserModal />
      </>
    </Providers.Users.Mutations.CreateUserProvider>
  </Providers.Users.Queries.UsersPageProvider>
);

export default UsersPage;
