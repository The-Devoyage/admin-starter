import CIcon from '@coreui/icons-react';
import {
  CAlert,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { MembershipsListLoading } from './memberships-list-loading';

interface MembershipsListProps {
  memberships: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'];
  loading: boolean;
}

export const MembershipsList: FC<MembershipsListProps> = ({
  memberships,
  loading,
}) => {
  const getAccountOwner = (
    membership: UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'][0],
  ) => {
    const accountOwner:
      | UserPage_GetUsersQuery['getUsers']['data'][0]['memberships'][0]['account']['users']['data'][0]
      | null = membership.account.users.data[0] ?? null;
    return accountOwner;
  };

  if (loading) {
    return <MembershipsListLoading />;
  }

  if (!memberships.length) {
    return (
      <CAlert color="info" className="mb-0">
        This user does not have any memberships.
      </CAlert>
    );
  }

  return (
    <Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
      {({
        setUpdateUserMembershipModalVisible,
        form,
        generateInitialMembershipValues,
      }) => (
        <CTable responsive hover borderless small className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Account</CTableHeaderCell>
              <CTableHeaderCell>Owner</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {memberships.map((m) => (
              <CTableRow
                key={m._id}
                role="button"
                onClick={() => {
                  const initialMembershipValues =
                    generateInitialMembershipValues(m);
                  form?.resetForm({
                    values: {
                      query: form.values.query,
                      payload: initialMembershipValues,
                    },
                  });
                  setUpdateUserMembershipModalVisible(true);
                }}
              >
                <CTableDataCell>
                  <CTooltip content={m.status}>
                    <CIcon icon={Utils.Memberships.determineIcon(m.status)} />
                  </CTooltip>
                </CTableDataCell>
                <CTableDataCell>{m.account._id}</CTableDataCell>
                <CTableDataCell style={{ textTransform: 'capitalize' }}>
                  {Utils.Users.determineName(m.account, getAccountOwner(m))}
                </CTableDataCell>
                <CTableDataCell style={{ textTransform: 'capitalize' }}>
                  {Utils.Memberships.determineRoleName(m.role)}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </Providers.Users.Mutations.UpdateUserProviderContext.Consumer>
  );
};
