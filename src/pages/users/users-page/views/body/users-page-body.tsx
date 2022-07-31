import { useGetUsersContext } from 'src/apollo/providers/users/queries';
import { UsersList } from 'src/components/users';
import { UsersPage_GetUsersQuery } from 'src/types/generated';

export const UsersPageBody = () => {
  const { users, stats, loading, handleFetchMore, handleSearch } =
    useGetUsersContext<UsersPage_GetUsersQuery['getUsers']['data'][0]>();

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
