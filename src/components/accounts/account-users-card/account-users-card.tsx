import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { FC } from 'react';
import { Account, Membership, User } from 'src/types/generated';
import { AccountUsersList } from '../account-users-list';

interface AccountUsersCardProps {
  account:
    | (Pick<Account, '_id' | 'email'> & {
        users: {
          data: (Pick<User, '_id' | 'email' | 'first_name' | 'last_name'> & {
            memberships: (Pick<Membership, 'status'> & {
              account: Pick<Account, '_id'>;
            })[];
          })[];
        };
      })
    | null;
  loading: boolean;
  setInviteUserModalVisible: (b: boolean) => void;
}

export const AccountUsersCard: FC<AccountUsersCardProps> = ({
  account,
  loading,
  setInviteUserModalVisible,
}) => {
  return (
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
  );
};
