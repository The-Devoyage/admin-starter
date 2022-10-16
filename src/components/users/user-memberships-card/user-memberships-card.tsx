import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
} from '@coreui/react';
import { FormikProps } from 'formik';
import { FC } from 'react';
import { UpdateUserInput, UserPage_GetUsersQuery } from 'src/types/generated';
import { MembershipsList } from '../memberships-list';

interface UserMembershipsCardProps {
  loading: boolean;
  user: UserPage_GetUsersQuery['getUsers']['data'][0] | null;
  setVisible: {
    inviteUserModal: (v: boolean) => void;
    updateUserMembershipModal: (v: boolean) => void;
  };
  form: FormikProps<UpdateUserInput> | null;
}

export const UserMembershipsCard: FC<UserMembershipsCardProps> = ({
  user,
  loading,
  setVisible,
  form,
}) => (
  <CCard>
    <CCardHeader>Memberships</CCardHeader>
    <CCardBody>
      <MembershipsList
        memberships={user?.memberships ?? []}
        loading={loading}
        form={form}
        setVisible={setVisible.updateUserMembershipModal}
      />
    </CCardBody>
    <CCardFooter className="d-flex justify-content-end">
      <CButton
        onClick={() => setVisible.inviteUserModal(true)}
        disabled={loading}
      >
        Add Membership
      </CButton>
    </CCardFooter>
  </CCard>
);
