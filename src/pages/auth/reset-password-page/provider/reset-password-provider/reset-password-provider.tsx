import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { RESET_PASSWORD_PAGE_RESET_PASSWORD } from '../../operations';

interface ResetPasswordProviderProps {
  children: ReactNode;
}

export const ResetPasswordProvider: FC<ResetPasswordProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.ResetPasswordProvider
      mutation={{
        documentNode: RESET_PASSWORD_PAGE_RESET_PASSWORD,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            callback: () => {
              if (!Variables.Auth.isAuthenticatedVar()) {
                navigate('/login');
              }
            },
            success: {
              message: 'Account Password Reset',
              header: 'Reset Password',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.ResetPasswordProvider>
  );
};
