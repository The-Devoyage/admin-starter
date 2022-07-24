import { CCol } from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import { AccountOverviewCard } from 'src/components/accounts';
import { CreateUserModal } from 'src/components/users';
import { Account, AccountPage_GetAccountsQuery } from 'src/types/generated';

interface AccountPageTopProps {
  account_id: Account['_id'];
}

export const AccountPageTop: FC<AccountPageTopProps> = ({ account_id }) => {
  const { account, loading, defaultUser } = useGetAccountsContext<
    AccountPage_GetAccountsQuery['getAccounts']['data'][0]
  >({ _id: account_id });

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
        <CreateUserModal />
      </CCol>
    </Providers.Users.Mutations.CreateUserProvider>
  );
};
