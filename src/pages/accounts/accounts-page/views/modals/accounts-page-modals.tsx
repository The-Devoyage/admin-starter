import { useContext } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { CreateAccountModal } from 'src/components/accounts';
import { AccountsPageContext } from '../../provider';

export const AccountsPageModals = () => {
  const { createAccountModalVisible, setCreateAccountModalVisible } =
    useContext(AccountsPageContext);
  const { form, loading } = Hooks.Accounts.useRegisterAccountContext();

  return (
    <CreateAccountModal
      visible={createAccountModalVisible}
      setVisible={(b) => setCreateAccountModalVisible(b)}
      form={form}
      loading={loading}
    />
  );
};
