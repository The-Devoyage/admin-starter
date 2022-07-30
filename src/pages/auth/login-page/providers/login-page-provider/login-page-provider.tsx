import { createContext, FC, ReactNode, useMemo } from 'react';

interface ILoginPageContext {}

export const LoginPageContext = createContext<ILoginPageContext>({});

interface LoginPageProps {
  children: ReactNode;
}

export const LoginPageProvider: FC<LoginPageProps> = ({ children }) => {
  const value = useMemo(() => ({}), []);

  return (
    <LoginPageContext.Provider value={value}>
      {children}
    </LoginPageContext.Provider>
  );
};
