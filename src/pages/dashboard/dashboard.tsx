import { CCol, CRow } from '@coreui/react';
import { AccountCountWidget } from 'src/components/accounts';
import { WelcomeCard } from 'src/components/dashboard/welcome-card';
import { UserCountWidget } from 'src/components/users';

const Dashboard = () => (
  <CRow>
    <CCol lg={8}>
      <WelcomeCard />
    </CCol>
    <CCol lg={4}>
      <AccountCountWidget />
      <UserCountWidget />
    </CCol>
  </CRow>
);

export default Dashboard;
