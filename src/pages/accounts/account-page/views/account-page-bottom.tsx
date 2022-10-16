import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import {
  AccountActivationCard,
  AccountUsersCard,
} from 'src/components/accounts';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountPageContext } from '../provider/account-page-provider';

export const AccountPageBottom = () => {
  const { loading, utils } =
    Hooks.Accounts.useGetAccounts<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();

  const { loading: resettingActivationCode, form } =
    Hooks.Accounts.useResetActivationCode();

  const { account_id, setInviteUserModalVisible } =
    useContext(AccountPageContext);

  if (!account_id) return null;

  const account = utils.getAccount(account_id);

  return (
    <>
      <CCol sm={6} className="mb-3">
        <AccountUsersCard
          account={account}
          loading={loading}
          setInviteUserModalVisible={setInviteUserModalVisible}
        />
      </CCol>
      <CCol sm={6} className="mb-3">
        <AccountActivationCard
          activation={account?.activation}
          loading={loading || resettingActivationCode}
          form={form}
        />
      </CCol>
    </>
  );
};
