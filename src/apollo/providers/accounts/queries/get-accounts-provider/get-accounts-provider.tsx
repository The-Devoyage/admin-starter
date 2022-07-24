import { useQuery } from '@apollo/client';
import { FC, createContext, useMemo, useContext, ReactNode } from 'react';
import { Utils } from 'src/common';
import {
  GetAccountsInput,
  GetUsersInput,
  StringFilterByEnum,
  Stats,
  Account,
  User,
} from 'src/types/generated';
import * as Apollo from '@apollo/client';
import { DeepPartial, getProperty } from 'src/apollo/utils';

type AccountBase = DeepPartial<Account>;

interface IGetAccountsContext<A extends AccountBase> {
  accounts: A[];
  loading: boolean;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  stats?: Stats;
  utils: {
    getAccount: (account_id: Account['_id']) => Account | null;
    getAccountUsers: (account_id: Account['_id']) => User[] | null;
    getDefaultUser: (account_id: Account['_id']) => User | null;
    getAccountOwner: (account_id: Account['_id']) => User | null;
  };
}

const GetAccountsContext = createContext<IGetAccountsContext<AccountBase>>({
  accounts: [],
  loading: false,
  handleFetchMore: () => null,
  handleSearch: () => null,
  utils: {
    getAccount: () => null,
    getDefaultUser: () => null,
    getAccountOwner: () => null,
    getAccountUsers: () => null,
  },
});

export const useGetAccountsContext = <A extends AccountBase>() => {
  const context = useContext<IGetAccountsContext<A>>(
    GetAccountsContext as unknown as React.Context<IGetAccountsContext<A>>,
  );

  if (!context) {
    throw Error('No Context Provider.');
  }

  return context;
};

interface GetAccountsProviderProps {
  children: ReactNode;
  query: {
    documentNode: Apollo.DocumentNode;
    variables: {
      getAccountsInput: GetAccountsInput;
      getUsersInput?: GetUsersInput;
    };
  };
}

export const GetAccountsProvider: FC<GetAccountsProviderProps> = ({
  children,
  query,
}) => {
  const { data, loading, fetchMore, refetch } = useQuery(query.documentNode, {
    variables: query.variables,
  });
  const accounts: Account[] = data?.getAccounts.data ?? [];
  const stats = data?.getAccounts.stats;

  const value = useMemo(() => {
    const getAccount = (account_id: Account['_id']) =>
      accounts.find((a) => getProperty(a, '_id') === account_id) ?? null;

    const getAccountUsers = (account_id: Account['_id']) => {
      const account = getAccount(account_id);
      const users = getProperty(account, 'users');
      return getProperty(users, 'data') ?? null;
    };

    const getDefaultUser = (account_id: Account['_id']) => {
      const users = getAccountUsers(account_id);
      const defaultUser = users?.find((u) =>
        getProperty(u, 'memberships')?.find(
          (m) => getProperty(m, '_id') === account_id,
        ),
      );
      return defaultUser ?? null;
    };

    const getAccountOwner = (account_id: Account['_id']) => {
      const users = getAccountUsers(account_id);
      const accountOwner = users?.find((u) =>
        getProperty(u, 'memberships')?.find((m) => !!getProperty(m, 'default')),
      );
      return accountOwner ?? null;
    };

    const handleFetchMore = () => {
      fetchMore({
        variables: {
          getUsersInput: {
            ...query.variables.getUsersInput,
          },
          getAccountsInput: {
            ...query.variables.getAccountsInput,
            config: {
              pagination: {
                limit: 10,
                createdAt: stats.cursor,
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
          getUsersInput: query.variables.getUsersInput,
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
            ...query.variables.getAccountsInput,
            config: {
              pagination: {
                limit: 10,
              },
            },
          },
          getUsersInput: query.variables.getUsersInput,
        });
      }
    };

    return {
      accounts,
      loading,
      handleFetchMore,
      handleSearch,
      stats,
      utils: {
        getAccount,
        getAccountUsers,
        getDefaultUser,
        getAccountOwner,
      },
    };
  }, [loading, stats, fetchMore, accounts, stats, refetch]);

  return (
    <GetAccountsContext.Provider value={value}>
      {children}
    </GetAccountsContext.Provider>
  );
};
