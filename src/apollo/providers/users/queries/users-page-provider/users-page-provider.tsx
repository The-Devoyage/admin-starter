import { createContext, FC, ReactNode, useMemo } from 'react';
import { Utils } from 'src/common';
import {
  GetUsersInput,
  UsersPage_GetUsersQuery,
  useUsersPage_GetUsersQuery,
  Stats,
  StringFilterByEnum,
} from 'src/types/generated';

export interface IUsersPageProviderContext {
  users: UsersPage_GetUsersQuery['getUsers']['data'] | [];
  loading: boolean;
  stats?: Pick<Stats, 'total' | 'remaining'>;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
}

export const UsersPageProviderContext =
  createContext<IUsersPageProviderContext>({
    users: [],
    loading: true,
    handleFetchMore: () => null,
    handleSearch: () => null,
  });

export interface UsersPageProviderProps {
  children: ReactNode;
  getUsersInput: GetUsersInput;
}

export const UsersPageProvider: FC<UsersPageProviderProps> = ({
  children,
  getUsersInput,
}) => {
  const { data, loading, fetchMore, refetch } = useUsersPage_GetUsersQuery({
    variables: {
      getUsersInput,
    },
  });

  const stats = data?.getUsers.stats;

  const value = useMemo(() => {
    const handleFetchMore = () => {
      fetchMore({
        variables: {
          getUsersInput: {
            ...getUsersInput,
            config: {
              pagination: {
                ...getUsersInput.config?.pagination,
                createdAt: data?.getUsers.stats.cursor,
              },
            },
          },
        },
      });
    };

    const handleSearch = (v: string) => {
      if (v) {
        const keyWords = v.split(' ').filter((k) => k !== '');

        const _id = [];

        for (const k of keyWords) {
          if (Utils.isValidObjectId(k)) {
            _id.push({ string: k, filterBy: StringFilterByEnum.Objectid });
          }
        }

        if (keyWords.length > 0 && keyWords[0] !== '') {
          refetch({
            getUsersInput: {
              query: {
                _id,
                email: keyWords.map((k) => ({
                  string: k,
                  filterBy: StringFilterByEnum.Regex,
                })),
                first_name: keyWords.map((k) => ({
                  string: k,
                  filterBy: StringFilterByEnum.Regex,
                })),
                last_name: keyWords.map((k) => ({
                  string: k,
                  filterBy: StringFilterByEnum.Regex,
                })),
                phone: keyWords.map((k) => ({
                  string: k,
                  filterBy: StringFilterByEnum.Regex,
                })),
              },
            },
          });
        }
      } else {
        refetch({
          getUsersInput,
        });
      }
    };

    const users = data?.getUsers.data ?? [];

    return { users, loading, stats, handleFetchMore, handleSearch };
  }, [
    loading,
    stats,
    data?.getUsers.data,
    data?.getUsers.stats.cursor,
    fetchMore,
    getUsersInput,
    refetch,
  ]);

  return (
    <UsersPageProviderContext.Provider value={value}>
      {children}
    </UsersPageProviderContext.Provider>
  );
};
