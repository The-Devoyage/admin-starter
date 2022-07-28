import {
  createContext,
  FC,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

interface IAccountsPageContext {
  createAccountModalVisible: boolean;
  setCreateAccountModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

export const AccountsPageContext = createContext<IAccountsPageContext>({
  createAccountModalVisible: false,
  setCreateAccountModalVisible: () => null,
});

interface AccountsPageProviderProps {
  children: ReactNode;
}

export const AccountsPageProvider: FC<AccountsPageProviderProps> = ({
  children,
}) => {
  const [createAccountModalVisible, setCreateAccountModalVisible] =
    useState(false);

  const value = useMemo(
    () => ({
      createAccountModalVisible,
      setCreateAccountModalVisible,
    }),
    [setCreateAccountModalVisible, createAccountModalVisible],
  );

  return (
    <AccountsPageContext.Provider value={value}>
      {children}
    </AccountsPageContext.Provider>
  );
};
