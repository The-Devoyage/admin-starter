import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { AccountOverviewCard } from 'src/components/accounts';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountPageContext } from '../provider/account-page-provider';

export const AccountPageTop = () => {
  const { loading, utils } =
    Hooks.Accounts.useGetAccounts<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();
  const { account_id, setCreateUserModalVisible } =
    useContext(AccountPageContext);
  const account = utils.getAccount(account_id!);
  const defaultUser = utils.getDefaultUser(account_id!);

  return (
    <CCol>
      <AccountOverviewCard
        account={account}
        defaultUser={defaultUser}
        loading={loading}
        setCreateUserModalVisible={setCreateUserModalVisible}
      />
    </CCol>
  );
};
