import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { CreateUserModal, InviteUserModal } from 'src/components/users';
import { AccountPageContext } from '../../provider/account-page-provider';

export const AccountPageModals = () => {
  const {
    createUserModalVisible,
    inviteUserModalVisible,
    setCreateUserModalVisible,
    setInviteUserModalVisible,
  } = useContext(AccountPageContext);

  const { form: createUserForm, loading: creatingUser } =
    Hooks.Users.useCreateUser();
  const { form: inviteUserForm, loading: invitingUser } =
    Hooks.Users.useInviteUser();

  return (
    <>
      <CreateUserModal
        visible={createUserModalVisible}
        setVisible={setCreateUserModalVisible}
        form={createUserForm}
        loading={creatingUser}
      />
      <InviteUserModal
        visible={inviteUserModalVisible}
        setVisible={setInviteUserModalVisible}
        form={inviteUserForm}
        loading={invitingUser}
      />
    </>
  );
};
