import { Hooks } from '@the-devoyage/orions-arrow';
import { useContext } from 'react';
import { CreateUserModal } from 'src/components/users';
import { UsersPageContext } from '../../provider/users-page-provider';

export const UsersPageModals = () => {
  const { form, loading } = Hooks.Users.useCreateUser();
  const { setCreateUserModalVisible, createUserModalVisible } =
    useContext(UsersPageContext);

  return (
    <CreateUserModal
      form={form}
      setVisible={setCreateUserModalVisible}
      visible={createUserModalVisible}
      loading={loading}
    />
  );
};
