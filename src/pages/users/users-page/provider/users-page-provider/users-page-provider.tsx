import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';

interface IUsersPageContext {
  createUserModalVisible: boolean;
  setCreateUserModalVisible: Dispatch<SetStateAction<boolean>>;
}

export const UsersPageContext = createContext<IUsersPageContext>({
  createUserModalVisible: false,
  setCreateUserModalVisible: () => null,
});

interface UsersPageProviderProps {
  children: ReactNode;
}

export const UsersPageProvider: FC<UsersPageProviderProps> = ({ children }) => {
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

  const value = useMemo(
    () => ({ createUserModalVisible, setCreateUserModalVisible }),
    [createUserModalVisible, setCreateUserModalVisible],
  );

  return (
    <UsersPageContext.Provider value={value}>
      {children}
    </UsersPageContext.Provider>
  );
};
