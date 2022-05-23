import { FC, createContext, useMemo } from 'react';
import { useLoginProvider_LoginUserMutation } from 'src/types/generated';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { Utils } from 'src/common';
import jwtDecode from 'jwt-decode';
import { Types } from 'src/types';

interface ILoginUserProviderContext {
  handleLoginUser: () => void;
}

interface LoginUserProviderProps {
  children: JSX.Element;
}

export const LoginUserProviderContext =
  createContext<ILoginUserProviderContext>({
    handleLoginUser: () => null,
  });

export const LoginUserProvider: FC<LoginUserProviderProps> = ({ children }) => {
  const [loginUser, loginUserResult] = useLoginProvider_LoginUserMutation();

  const navigate = useNavigate();
  const { handleFormError, handleFormSuccess } = Utils.useFormHelpers();

  const value = useMemo(() => {
    const handleLoginUser = () => {
      loginUser({
        onCompleted: (data) => {
          const decoded: Types.Auth.Decoded = jwtDecode(data.loginUser.token);

          if (decoded.user.role >= 10) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return navigate('/forbidden');
          }

          localStorage.setItem('token', data.loginUser.token);
          localStorage.setItem('user', data.loginUser.user._id);

          Variables.Auth.isAuthenticatedVar(true);

          handleFormSuccess({
            reset: loginUserResult.reset,
            success: {
              header: 'Login User',
              message: 'User Login Successful.',
            },
          });
          return navigate('/');
        },
        onError: (error) =>
          handleFormError({
            error,
            reset: loginUserResult.reset,
          }),
      });
    };
    return { handleLoginUser };
  }, [
    handleFormError,
    handleFormSuccess,
    loginUser,
    loginUserResult.reset,
    navigate,
  ]);

  return (
    <LoginUserProviderContext.Provider value={value}>
      {children}
    </LoginUserProviderContext.Provider>
  );
};
