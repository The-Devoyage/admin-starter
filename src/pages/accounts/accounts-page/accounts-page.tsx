import { AccountsPageRootProvider } from './provider';
import { AccountsPageBody, AccountsPageModals } from './views';

export const AccountsPage = () => (
  <AccountsPageRootProvider>
    <AccountsPageBody />
    <AccountsPageModals />
  </AccountsPageRootProvider>
);
