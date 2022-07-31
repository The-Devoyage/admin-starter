import { UsersPageRootProvider } from './provider';
import { UsersPageBody, UsersPageModals } from './views';

const UsersPage = () => (
  <UsersPageRootProvider>
    <UsersPageBody />
    <UsersPageModals />
  </UsersPageRootProvider>
);

export default UsersPage;
