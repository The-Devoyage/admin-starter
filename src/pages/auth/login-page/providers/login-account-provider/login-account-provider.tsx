import { FC, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Providers, Variables } from 'src/apollo';
import { LoginUserProviderContext } from 'src/apollo/providers/users/mutations';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { LOGIN_PAGE_LOGIN } from '../../operations';

interface LoginAccountProviderProps {
  children: ReactNode;
}

export const LoginAccountProvider: FC<LoginAccountProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const navigate = useNavigate();
  const { handleLoginUser } = useContext(LoginUserProviderContext);

  return (
    <Providers.Accounts.Mutations.LoginAccountProvider
      mutation={{
        documentNode: LOGIN_PAGE_LOGIN,
        onCompleted: (data, helpers, reset) => {
          localStorage.setItem('token', data.token);
          if (handleLoginUser) {
            handleLoginUser();
          } else {
            handleFormSuccess({
              reset,
              helpers,
              success: {
                header: 'Login Account',
                message:
                  'Account Login Successful. Limited access due to missing user login.',
              },
            });
            Variables.Auth.isAuthenticatedVar(true);
            navigate('/');
          }
        },
        onError: (error, helpers, reset) => {
          localStorage.removeItem('user');
          handleFormError({
            error,
            reset,
            helpers,
          });
        },
      }}
    >
      {children}
    </Providers.Accounts.Mutations.LoginAccountProvider>
  );
};
