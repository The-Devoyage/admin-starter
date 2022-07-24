import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import { Account, AccountPage_GetAccountsQuery } from 'src/types/generated';
import { AccountUsersList } from '../account-users-list';

interface AccountUsersCardProps {
  account_id: Account['_id'];
}

export const AccountUsersCard: FC<AccountUsersCardProps> = ({ account_id }) => {
  const { loading, utils } =
    useGetAccountsContext<
      AccountPage_GetAccountsQuery['getAccounts']['data'][0]
    >();

  const account = utils.getAccount(account_id);

  return (
    <Providers.Users.Mutations.InviteUserProviderContext.Consumer>
      {({ setInviteUserModalVisible }) => (
        <CCard>
          <CCardHeader>Account Users</CCardHeader>
          <CCardBody>
            <AccountUsersList account={account} loading={loading} />
          </CCardBody>
          <CCardFooter className="d-flex justify-content-end">
            <CButton onClick={() => setInviteUserModalVisible(true)}>
              Invite User
            </CButton>
          </CCardFooter>
        </CCard>
      )}
    </Providers.Users.Mutations.InviteUserProviderContext.Consumer>
  );
};
