import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { Providers } from 'src/apollo';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import { AccountOverviewCard } from 'src/components/accounts';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountPageContext } from '../provider/account-page-provider';

export const AccountPageTop = () => {
  const { loading, utils } =
    useGetAccountsContext<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();
  const { account_id } = useContext(AccountPageContext);
  const account = utils.getAccount(account_id!);
  const defaultUser = utils.getDefaultUser(account_id!);

  return (
    <Providers.Users.Mutations.CreateUserProvider
      createUserInput={{
        payload: {
          email: account?.email ?? '',
          memberships: {
            account: account?._id!,
            default: true,
            role: 10,
          },
        },
      }}
    >
      <CCol>
        <AccountOverviewCard
          account={account}
          defaultUser={defaultUser}
          loading={loading}
        />
      </CCol>
    </Providers.Users.Mutations.CreateUserProvider>
  );
};
