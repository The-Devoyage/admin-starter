import { useContext } from 'react';
import { UsersList } from 'src/components/users';
import { UsersPage_GetUsersQuery } from 'src/types/generated';
import { Hooks } from '@the-devoyage/orions-arrow';
import { UsersPageContext } from '../../provider/users-page-provider';

export const UsersPageBody = () => {
  const { setCreateUserModalVisible } = useContext(UsersPageContext);
  const { users, stats, loading, handleFetchMore, handleSearch } =
    Hooks.Users.useGetUsers<UsersPage_GetUsersQuery['getUsers']['data'][0]>();

  return (
    <UsersList
      users={users}
      stats={stats}
      loading={loading}
      handleFetchMore={handleFetchMore}
      handleSearch={handleSearch}
      setCreateUserModalVisible={setCreateUserModalVisible}
    />
  );
};
