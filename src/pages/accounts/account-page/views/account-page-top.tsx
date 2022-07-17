import { CCol } from '@coreui/react';
import { Providers } from 'src/apollo';
import { AccountOverviewCard } from 'src/components/accounts';
import { CreateUserModal } from 'src/components/users';

export const AccountPageTop = () => (
  <Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
    {({ account, defaultUser, loading }) => (
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
    )}
  </Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
);
