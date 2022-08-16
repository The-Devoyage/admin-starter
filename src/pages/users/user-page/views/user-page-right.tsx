import { useContext } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { UserMembershipsCard } from 'src/components/users';
import { UpdateUserMembershipModal } from 'src/components/users/update-user-membership-modal';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageRight = () => {
  const {
    user_id,
    setInviteUserModalVisible,
    updateUserMembershipModalVisible,
    setUpdateUserMembershipModalVisible,
  } = useContext(UserPageContext);

  const {
    loading: fetchingUsers,
    utils,
    users,
    handleSearch,
  } = Hooks.Users.useGetUsers<UserPage_GetUsersQuery['getUsers']['data'][0]>();

  const { form, loading: updatingMembership } = Hooks.Users.useUpdateUser();

  const user = utils.getUser(user_id!);

  const loading = fetchingUsers || updatingMembership;

  return (
    <>
      <UserMembershipsCard
        loading={loading}
        user={user}
        setInviteUserModalVisible={setInviteUserModalVisible}
      />
      <UpdateUserMembershipModal
        form={form}
        users={users}
        loading={loading}
        handleSearch={handleSearch}
        updateUserMembershipModalVisible={updateUserMembershipModalVisible}
        setUpdateUserMembershipModalVisible={
          setUpdateUserMembershipModalVisible
        }
      />
    </>
  );
};
