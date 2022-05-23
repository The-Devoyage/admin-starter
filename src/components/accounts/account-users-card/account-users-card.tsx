import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { Providers } from 'src/apollo';
import { AccountUsersList } from '../account-users-list';

export const AccountUsersCard = () => (
  <Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
    {({ account, loading }) => (
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
    )}
  </Providers.Accounts.Queries.AccountPageProviderContext.Consumer>
);
