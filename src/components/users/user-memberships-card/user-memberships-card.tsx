import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { FC } from 'react';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { MembershipsList } from '../memberships-list';

interface UserMembershipsCardProps {
  loading: boolean;
  user: UserPage_GetUsersQuery['getUsers']['data'][0] | null;
  setInviteUserModalVisible: (v: boolean) => void;
}

export const UserMembershipsCard: FC<UserMembershipsCardProps> = ({
  user,
  loading,
  setInviteUserModalVisible,
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
      <CButton
        onClick={() => setInviteUserModalVisible(true)}
        disabled={loading}
      >
        Add Membership
      </CButton>
    </CCardFooter>
  </CCard>
);
