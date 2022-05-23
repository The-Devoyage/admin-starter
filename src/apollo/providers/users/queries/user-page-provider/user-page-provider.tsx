import { createContext, FC, useEffect, useMemo } from 'react';
import {
  GetUsersInput,
  UserPage_GetUsersQuery,
  useUserPage_GetUsersQuery,
} from 'src/types/generated';
import { useNavigate } from 'react-router-dom';

export interface IUserPageProviderContext {
  user: UserPage_GetUsersQuery['getUsers']['data'][0] | null;
  loading: boolean;
}

export const UserPageProviderContext = createContext<IUserPageProviderContext>({
  user: null,
  loading: false,
});

export interface UserPageProviderProps {
  children: JSX.Element;
  getUsersInput: GetUsersInput;
  membershipsAccountUsersInput: GetUsersInput;
}

export const UserPageProvider: FC<UserPageProviderProps> = ({
  children,
  getUsersInput,
  membershipsAccountUsersInput,
}) => {
  const navigate = useNavigate();

  const { data, loading } = useUserPage_GetUsersQuery({
    variables: {
      getUsersInput,
      membershipsAccountUsersInput,
    },
  });

  const user = data?.getUsers.data[0] ?? null;

  useEffect(() => {
    if (!user && !loading) {
      navigate('/lost', { replace: true });
    }
  }, [user, loading, navigate]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  return (
    <UserPageProviderContext.Provider value={value}>
      {children}
    </UserPageProviderContext.Provider>
  );
};
