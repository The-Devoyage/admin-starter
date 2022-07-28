import {
  CAlert,
  CAlertHeading,
  CContainer,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FC } from 'react';
import { Utils } from 'src/common';
import { Account, Membership, User } from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

interface AccountUsersListProps {
  loading: boolean;
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
}

export const AccountUsersList: FC<AccountUsersListProps> = ({
  account,
  loading,
}) => {
  const navigate = useNavigate();
  const users = account?.users.data;

  if (loading) {
    return (
      <CContainer className="d-flex justify-content-center">
        <CSpinner />
      </CContainer>
    );
  }

  if (!users?.length) {
    return (
      <CAlert color="info" className="mb-0">
        <CAlertHeading>No Members Found</CAlertHeading>
        Invite members to manage this account.
      </CAlert>
    );
  }

  return (
    <CTable hover borderless responsive className="text-center">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>User</CTableHeaderCell>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users?.map((u) => (
          <CTableRow
            key={u._id}
            role="button"
            onClick={() => navigate(`/users/user?user_id=${u._id}`)}
          >
            <CTableDataCell>
              {Utils.Users.determineName(null, u)}
            </CTableDataCell>
            <CTableDataCell>{u._id}</CTableDataCell>
            <CTableDataCell>
              <CIcon
                icon={Utils.Memberships.determineIcon(
                  u.memberships.find((m) => m.account._id === account?._id)
                    ?.status,
                )}
              />
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};
