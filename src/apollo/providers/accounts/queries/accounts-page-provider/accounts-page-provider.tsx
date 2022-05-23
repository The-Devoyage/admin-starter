import { FC, createContext, useMemo } from 'react';
import { Utils } from 'src/common';
import {
  AccountsPage_GetAccountsQuery,
  GetAccountsInput,
  GetUsersInput,
  StringFilterByEnum,
  useAccountsPage_GetAccountsQuery,
  Stats,
} from 'src/types/generated';

export interface IAccountsPageProviderContext {
  accounts: AccountsPage_GetAccountsQuery['getAccounts']['data'];
  loading: boolean;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  stats?: Pick<Stats, 'total' | 'remaining'>;
}

export interface AccountsPageProviderProps {
  getAccountsInput: GetAccountsInput;
  getUsersInput: GetUsersInput;
  children: JSX.Element;
}

export const AccountsPageProviderContext =
  createContext<IAccountsPageProviderContext>({
    accounts: [],
    loading: false,
    handleFetchMore: () => null,
    handleSearch: () => null,
    stats: { total: 0, remaining: 0 },
  });

export const AccountsPageProvider: FC<AccountsPageProviderProps> = ({
  getAccountsInput,
  getUsersInput,
  children,
}) => {
  const { data, loading, fetchMore, refetch } =
    useAccountsPage_GetAccountsQuery({
      variables: {
        getAccountsInput,
        getUsersInput,
      },
    });

  const stats = data?.getAccounts.stats;

  const value = useMemo(() => {
    const handleFetchMore = () => {
      fetchMore({
        variables: {
          getUsersInput: {
            getUsersInput,
            getAccountsInput: {
              ...getAccountsInput,
              config: {
                pagination: {
                  limit: 10,
                  createdAt: data?.getAccounts.stats.cursor,
                },
              },
            },
          },
        },
      });
    };

    const handleSearch = (v: string) => {
      if (v) {
        const isId = Utils.isValidObjectId(v);
        let _id;
        if (isId) {
          _id = [{ string: v, filterBy: StringFilterByEnum.Objectid }];
        }

        refetch({
          getUsersInput,
          getAccountsInput: {
            query: {
              _id,
              email: [{ string: v, filterBy: StringFilterByEnum.Regex }],
            },
          },
        });
      } else {
        refetch({
          getAccountsInput: {
            ...getAccountsInput,
            config: {
              pagination: {
                limit: 10,
              },
            },
          },
          getUsersInput,
        });
      }
    };

    const accounts = data?.getAccounts.data ?? [];

    return { accounts, loading, handleFetchMore, handleSearch, stats };
  }, [
    loading,
    stats,
    fetchMore,
    data?.getAccounts.data,
    data?.getAccounts.stats.cursor,
    getAccountsInput,
    refetch,
    getUsersInput,
  ]);

  return (
    <AccountsPageProviderContext.Provider value={value}>
      {children}
    </AccountsPageProviderContext.Provider>
  );
};
