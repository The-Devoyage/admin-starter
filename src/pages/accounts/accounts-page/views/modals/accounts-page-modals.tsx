import { useContext } from 'react';
import { useRegisterAccountContext } from 'src/apollo/providers/accounts/mutations';
import { CreateAccountModal } from 'src/components/accounts';
import { AccountsPageContext } from '../../provider';

export const AccountsPageModals = () => {
  const { createAccountModalVisible, setCreateAccountModalVisible } =
    useContext(AccountsPageContext);
  const { form, loading } = useRegisterAccountContext();

  return (
    <CreateAccountModal
      visible={createAccountModalVisible}
      setVisible={(b) => setCreateAccountModalVisible(b)}
      form={form}
      loading={loading}
    />
  );
};
