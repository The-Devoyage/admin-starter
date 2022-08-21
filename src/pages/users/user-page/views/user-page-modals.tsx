import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { InviteUserModal, UpdateUserModal } from 'src/components/users';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageModals = () => {
  const {
    setInviteUserModalVisible,
    inviteUserModalVisible,
    updateUserModalVisible,
    setUpdateUserModalVisible,
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
    </>
  );
};
