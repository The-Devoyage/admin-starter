import { CRow } from '@coreui/react';
import { AccountPageRootProvider } from './provider';
import { AccountPageBottom, AccountPageTop } from './views';
import { AccountPageModals } from './views/modals';

export const AccountPage = () => (
  <AccountPageRootProvider>
    <CRow className="mb-3">
      <AccountPageTop />
    </CRow>
    <CRow className="mb-3">
      <AccountPageBottom />
    </CRow>
    <AccountPageModals />
  </AccountPageRootProvider>
);
