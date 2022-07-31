import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { useResetActivationCodeContext } from 'src/apollo/providers/accounts/mutations';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import {
  AccountActivationCard,
  AccountUsersCard,
} from 'src/components/accounts';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountPageContext } from '../provider/account-page-provider';

export const AccountPageBottom = () => {
  const { loading, utils } =
    useGetAccountsContext<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();

  const { loading: resettingActivationCode, form } =
    useResetActivationCodeContext();

  const { account_id, setInviteUserModalVisible } =
    useContext(AccountPageContext);

  const account = utils.getAccount(account_id!);

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
