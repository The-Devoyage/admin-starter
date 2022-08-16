import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { InviteUserModal } from 'src/components/users';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageModals = () => {
  const { setInviteUserModalVisible, inviteUserModalVisible } =
    useContext(UserPageContext);

  const { users, handleSearch } =
    Hooks.Users.useGetUsers<UserPage_GetUsersQuery['getUsers']['data'][0]>();

  const { loading, form } = Hooks.Users.useInviteUser();

  return (
    <InviteUserModal
      form={form}
      handleSearch={handleSearch}
      loading={loading}
      users={users}
      setInviteUserModalVisible={setInviteUserModalVisible}
      inviteUserModalVisible={inviteUserModalVisible}
    />
  );
};
