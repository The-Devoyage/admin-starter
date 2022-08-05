import { ReactNode, useEffect, createContext, FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';

interface IUserPageContext {
  user_id: User['_id'] | null;
}

export const UserPageContext = createContext<IUserPageContext>({
  user_id: null,
});

interface UserPageProviderProps {
  children: ReactNode;
}

export const UserPageProvider: FC<UserPageProviderProps> = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id || !Utils.isValidObjectId(user_id)) {
      return navigate('/lost', { replace: true });
    }

    return undefined;
  }, [user_id, navigate]);

  if (!user_id) {
    return null;
  }

  const value = useMemo(() => ({ user_id }), [user_id]);

  return (
    <UserPageContext.Provider value={value}>
      {children}
    </UserPageContext.Provider>
  );
};
