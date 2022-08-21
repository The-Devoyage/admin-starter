import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { FC } from 'react';
import { Format } from 'src/common/utils/format';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { UserDetailsCardLoading } from './user-details-card-loading';

interface UserDetailsCardProps {
  loading: boolean;
  user: UserPage_GetUsersQuery['getUsers']['data'][0] | null;
  setUpdateUserModalVisible: (v: boolean) => void;
}

export const UserDetailsCard: FC<UserDetailsCardProps> = ({
  user,
  loading,
  setUpdateUserModalVisible,
}) => {
  if (loading) {
    return <UserDetailsCardLoading />;
  }

  return (
    <CCard className="mb-3">
      <CCardHeader>User Details</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol lg={6}>ID:</CCol>
          <CCol lg={6}>{user?._id ?? '--'}</CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>First Name:</CCol>
          <CCol lg={6}>{user?.first_name ?? '--'}</CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>Last Name:</CCol>
          <CCol lg={6}>{user?.last_name ?? '--'}</CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>Email:</CCol>
          <CCol lg={6}>{user?.email ?? '--'}</CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>Phone:</CCol>
          <CCol lg={6}>{user?.phone ?? '--'}</CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>Last Updated:</CCol>
          <CCol lg={6}>
            {Format.Date.toLocalDateString(user?.updatedAt) ?? '--'}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>Created:</CCol>
          <CCol lg={6}>
            {Format.Date.toLocalDateString(user?.createdAt) ?? '--'}
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter className="d-flex justify-content-end">
        <CButton
          color="primary"
          onClick={() => setUpdateUserModalVisible(true)}
        >
          Edit User Details
        </CButton>
      </CCardFooter>
    </CCard>
  );
};
