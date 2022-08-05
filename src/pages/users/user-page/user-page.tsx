import { CCol, CRow } from '@coreui/react';
import { UserPageRootProvider } from './provider';
import { UserPageRight, UserPageLeft } from './views';

const UserPage = () => {
  return (
    <UserPageRootProvider>
      <CRow>
        <CCol md={12} lg={6}>
          <UserPageLeft />
        </CCol>
        <CCol md={12} lg={6}>
          <UserPageRight />
        </CCol>
      </CRow>
    </UserPageRootProvider>
  );
};

export default UserPage;
