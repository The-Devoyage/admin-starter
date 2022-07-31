import { DocumentNode, useQuery } from '@apollo/client';
import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { UserBase } from 'src/apollo/types';
import { Utils } from 'src/common';
import { GetUsersInput, Stats, StringFilterByEnum } from 'src/types/generated';

interface IGetUsersContext<U extends UserBase> {
  users: U[];
  loading: boolean;
  handleFetchMore: () => void;
  handleSearch: (v: string) => void;
  stats?: Stats;
}

const GetUsersContext = createContext<IGetUsersContext<UserBase>>({
  users: [],
  loading: false,
  handleFetchMore: () => null,
  handleSearch: () => null,
});

export const useGetUsersContext = <U extends UserBase>() => {
  const context = useContext<IGetUsersContext<U>>(
    GetUsersContext as unknown as React.Context<IGetUsersContext<U>>,
  );

  if (!context) {
    throw new Error('Get users context provider not found.');
  }

  return context;
};

interface GetUsersProviderProps {
  children: ReactNode;
  query: {
    documentNode: DocumentNode;
    variables: {
      getUsersInput: GetUsersInput;
    };
  };
}

export const GetUsersProvider: FC<GetUsersProviderProps> = ({
  children,
  query,
}) => {
  const { data, loading, fetchMore, refetch } = useQuery(query.documentNode, {
    variables: query.variables,
  });
  const stats = data?.getUsers.stats;

  const value = useMemo(() => {
    const handleFetchMore = () => {
      fetchMore({
        variables: {
          getUsersInput: {
            ...query.variables.getUsersInput,
            config: {
              pagination: {
                ...query.variables.getUsersInput.config?.pagination,
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
          getUsersInput: query.variables.getUsersInput,
        });
      }
    };

    const users = data?.getUsers.data ?? [];

    return { users, loading, stats, handleFetchMore, handleSearch };
  }, [loading, data]);

  return (
    <GetUsersContext.Provider value={value}>
      {children}
    </GetUsersContext.Provider>
  );
};
