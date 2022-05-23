import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { FC } from 'react';
import { Providers } from 'src/apollo';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { MembershipsList } from '../memberships-list';

interface UserMembershipsCardProps {
  loading: boolean;
  user: UserPage_GetUsersQuery['getUsers']['data'][0] | null;
}

export const UserMembershipsCard: FC<UserMembershipsCardProps> = ({
  user,
  loading,
}) => (
  <CCard>
    <CCardHeader>Memberships</CCardHeader>
    <CCardBody>
      <MembershipsList
        memberships={user?.memberships ?? []}
        loading={loading}
      />
    </CCardBody>
    <CCardFooter className="d-flex justify-content-end">
      <Providers.Users.Mutations.InviteUserProviderContext.Consumer>
        {({ setInviteUserModalVisible }) => (
          <CButton
            onClick={() => setInviteUserModalVisible(true)}
            disabled={loading}
          >
            Add Membership
          </CButton>
        )}
      </Providers.Users.Mutations.InviteUserProviderContext.Consumer>
    </CCardFooter>
  </CCard>
);
