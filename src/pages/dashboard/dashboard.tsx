import { CCol, CRow } from '@coreui/react';
import { DashboardPageRootProvider } from './provider';
import { DashboardRight } from './views';
import { DashboardLeft } from './views/dashboard-left';

export const Dashboard = () => (
  <DashboardPageRootProvider>
    <CRow>
      <CCol lg={8}>
        <DashboardLeft />
      </CCol>
      <CCol lg={4}>
        <DashboardRight />
      </CCol>
    </CRow>
  </DashboardPageRootProvider>
);
