import { CRow } from '@coreui/react';
import { AccountPageProvider } from './provider';
import { AccountPageBottom, AccountPageTop } from './views';

const AccountPage = () => {
  return (
    <AccountPageProvider>
      <CRow className="mb-3">
        <AccountPageTop />
      </CRow>
      <CRow className="mb-3">
        <AccountPageBottom />
      </CRow>
    </AccountPageProvider>
  );
};

export default AccountPage;
