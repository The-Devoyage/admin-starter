import { Providers } from 'src/apollo';
import { AccountsList } from 'src/components/accounts';
import { CreateAccountModal } from 'src/components/accounts/create-account-modal';
import { ACCOUNTS_LIST_GET_ACCOUNTS } from './query';

const AccountsPage = () => (
  <Providers.Accounts.Queries.GetAccountsProvider
    query={{
      documentNode: ACCOUNTS_LIST_GET_ACCOUNTS,
      variables: {
        getUsersInput: { query: {} },
        getAccountsInput: { query: {} },
      },
    }}
  >
    <Providers.Accounts.Mutations.RegisterProvider
      registerInput={{ email: '' }}
    >
      <>
        <AccountsList />
        <CreateAccountModal />
      </>
    </Providers.Accounts.Mutations.RegisterProvider>
  </Providers.Accounts.Queries.GetAccountsProvider>
);

export default AccountsPage;
