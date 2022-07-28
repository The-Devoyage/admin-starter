import { useGetAccountsContext } from 'src/apollo/providers/accounts/queries';
import { AccountsList_GetAccountsQuery } from 'src/types/generated';
import { useContext } from 'react';
import { AccountsList } from 'src/components/accounts';
import { AccountsPageContext } from '../../provider';

export const AccountsPageBody = () => {
  const { setCreateAccountModalVisible } = useContext(AccountsPageContext);
  const { accounts, loading, stats, handleSearch, handleFetchMore } =
    useGetAccountsContext<
      AccountsList_GetAccountsQuery['getAccounts']['data'][0]
    >();

  return (
    <AccountsList
      accounts={accounts}
      loading={loading}
      stats={stats}
      handleSearch={handleSearch}
      handleFetchMore={handleFetchMore}
      setCreateAccountModalVisible={setCreateAccountModalVisible}
    />
  );
};
