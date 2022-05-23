import { FC, createContext, ReactNode, useMemo } from 'react';
import { Utils } from 'src/common';
import {
  GetUsersInput,
  StringFilterByEnum,
  UserSelect_GetUsersQuery,
  useUserSelect_GetUsersQuery,
} from 'src/types/generated';

interface UserSelectProviderProps {
  getUsersInput: GetUsersInput;
  children: ReactNode;
}

interface IUserSelectProviderContext {
  users: UserSelect_GetUsersQuery['getUsers']['data'] | null;
  loading: boolean;
  handleSearch: (v: string) => void;
}

export const UserSelectProviderContext =
  createContext<IUserSelectProviderContext>({
    users: null,
    loading: false,
    handleSearch: () => null,
  });

export const UserSelectProvider: FC<UserSelectProviderProps> = ({
  getUsersInput,
  children,
}) => {
  const { data, loading, refetch } = useUserSelect_GetUsersQuery({
    variables: {
      getUsersInput,
    },
  });

  const users = data?.getUsers.data ?? null;

  const value = useMemo(() => {
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
              user: {
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
    return { users, loading, handleSearch };
  }, [users, loading, getUsersInput, refetch]);

  return (
    <UserSelectProviderContext.Provider value={value}>
      {children}
    </UserSelectProviderContext.Provider>
  );
};
