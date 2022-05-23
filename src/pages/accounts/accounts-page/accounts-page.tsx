import { Providers } from 'src/apollo';
import { AccountsList } from 'src/components/accounts';
import { CreateAccountModal } from 'src/components/accounts/create-account-modal';

const AccountsPage = () => (
  <Providers.Accounts.Queries.AccountsPageProvider
    getAccountsInput={{ query: {} }}
    getUsersInput={{ query: {} }}
  >
    <Providers.Accounts.Mutations.RegisterProvider
      registerInput={{ email: '' }}
    >
      <>
        <AccountsList />
        <CreateAccountModal />
      </>
    </Providers.Accounts.Mutations.RegisterProvider>
  </Providers.Accounts.Queries.AccountsPageProvider>
);

export default AccountsPage;
