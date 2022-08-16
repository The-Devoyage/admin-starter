import { Providers } from '@the-devoyage/orions-arrow';
import jwtDecode from 'jwt-decode';
import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { Types } from 'src/types';
import { LoginProvider_LoginUserMutation } from 'src/types/generated';
import { LOGIN_PAGE_LOGIN_USER } from '../../operations';

interface LoginUserProviderProps {
  children: ReactNode;
}

export const LoginUserProvider: FC<LoginUserProviderProps> = ({ children }) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const navigate = useNavigate();

  return (
    <Providers.Users.Mutations.LoginUserProvider<
      LoginProvider_LoginUserMutation['loginUser']['user']
    >
      mutation={{
        documentNode: LOGIN_PAGE_LOGIN_USER,
        onCompleted: (data, _, reset) => {
          const decoded: Types.Auth.Decoded = jwtDecode(data.token);

          if (decoded.user.role >= 10) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return navigate('/forbidden');
          }

          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user._id);

          Variables.Auth.isAuthenticatedVar(true);

          handleFormSuccess({
            reset,
            success: {
              header: 'Login User',
              message: 'User Login Successful.',
            },
          });
          return navigate('/');
        },
        onError: (error, _, reset) =>
          handleFormError({
            error,
            reset,
          }),
      }}
    >
      {children}
    </Providers.Users.Mutations.LoginUserProvider>
  );
};
