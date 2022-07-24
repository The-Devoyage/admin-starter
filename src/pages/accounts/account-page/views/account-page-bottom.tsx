import { CCol, CRow } from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import {
  AccountActivationCard,
  AccountUsersCard,
} from 'src/components/accounts';
import { InviteUserModal } from 'src/components/users';
import { Account, AccountPage_GetAccountsQuery } from 'src/types/generated';

interface AccountPageBottomProps {
  account_id: Account['_id'];
}

export const AccountPageBottom: FC<AccountPageBottomProps> = ({
  account_id,
}) => {
  const { accounts, loading } = useGetAccountsContext<
    AccountPage_GetAccountsQuery['getAccounts']['data'][0]
  >({});
  const account = accounts.find((a) => a._id === account_id);

  return (
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
            <AccountUsersCard account_id={account_id} />
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
  );
};
