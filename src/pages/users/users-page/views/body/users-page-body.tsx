import { UsersList } from 'src/components/users';
import { UsersPage_GetUsersQuery } from 'src/types/generated';
import { Hooks } from '@the-devoyage/orions-arrow';

export const UsersPageBody = () => {
  const { users, stats, loading, handleFetchMore, handleSearch } =
    Hooks.Users.useGetUsersContext<
      UsersPage_GetUsersQuery['getUsers']['data'][0]
    >();

  return (
    <UsersList
      users={users}
      stats={stats}
      loading={loading}
      handleFetchMore={handleFetchMore}
      handleSearch={handleSearch}
    />
  );
};
