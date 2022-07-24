import { Providers } from 'src/apollo';
import { ACCOUNTS_LIST_GET_ACCOUNTS } from 'src/apollo/providers/accounts/queries/get-accounts-provider/operations';
import { AccountsList } from 'src/components/accounts';
import { CreateAccountModal } from 'src/components/accounts/create-account-modal';

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
