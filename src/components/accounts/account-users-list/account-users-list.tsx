import {
  CAlert,
  CAlertHeading,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import { FC } from 'react';
import { Utils } from 'src/common';
import { AccountPage_GetAccountsQuery } from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import CIcon from '@coreui/icons-react';

interface AccountUsersListProps {
  loading: boolean;
  account: AccountPage_GetAccountsQuery['getAccounts']['data'][0] | null;
}

export const AccountUsersList: FC<AccountUsersListProps> = ({
  account,
  loading,
}) => {
  const navigate = useNavigate();
  const users = account?.users.data;

  if (loading) {
    return null;
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
