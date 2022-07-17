import { CCol, CRow } from '@coreui/react';
import { Providers } from 'src/apollo';
import {
  AccountActivationCard,
  AccountUsersCard,
} from 'src/components/accounts';
import { InviteUserModal } from 'src/components/users';

export const AccountPageBottom = () => (
  <Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
    {({ account, loading }) => (
      <Providers.Users.Mutations.InviteUserProvider
        inviteUserInput={{
          query: {
            _id: [],
          },
          payload: {
            memberships: {
              account: account?._id!,
              local: {
                first_name: '',
                last_name: '',
                about: '',
                image: undefined,
                phone: '',
                address: {
                  zip: '',
                  city: '',
                  state: '',
                  lineOne: '',
                  lineTwo: '',
                },
              },
            },
          },
        }}
      >
        <Providers.Accounts.Mutations.ResetActivationCodeProvider
          resetCodeInput={{ email: account?.email ?? '' }}
        >
          <CRow>
            <CCol>
              <AccountUsersCard />
            </CCol>
            <CCol>
              <AccountActivationCard
                activation={account?.activation}
                loading={loading}
              />
            </CCol>
          </CRow>
          <InviteUserModal />
        </Providers.Accounts.Mutations.ResetActivationCodeProvider>
      </Providers.Users.Mutations.InviteUserProvider>
    )}
  </Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
);
