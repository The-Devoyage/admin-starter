import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { InviteUserModal, UpdateUserModal } from 'src/components/users';
import { UpdateUserMembershipModal } from 'src/components/users/update-user-membership-modal';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageModals = () => {
  const {
    setInviteUserModalVisible,
    inviteUserModalVisible,
    updateUserModalVisible,
    setUpdateUserModalVisible,
    updateUserMembershipModalVisible,
    setUpdateUserMembershipModalVisible,
  } = useContext(UserPageContext);

  const { loading, form } = Hooks.Users.useInviteUser();

  const { form: updateUserForm, loading: updatingUser } =
    Hooks.Users.useUpdateUser();

  return (
    <>
      <UpdateUserModal
        visible={updateUserModalVisible}
        setVisible={setUpdateUserModalVisible}
        form={updateUserForm}
        loading={updatingUser}
      />
      <InviteUserModal
        form={form}
        loading={loading}
        setVisible={setInviteUserModalVisible}
        visible={inviteUserModalVisible}
      />
      <UpdateUserMembershipModal
        form={updateUserForm}
        loading={loading}
        visible={updateUserMembershipModalVisible}
        setVisible={setUpdateUserMembershipModalVisible}
      />
    </>
  );
};
