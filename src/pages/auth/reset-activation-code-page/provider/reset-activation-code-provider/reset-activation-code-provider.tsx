import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Variables } from 'src/apollo';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { RESET_ACTIVATION_CODE_PAGE_RESET_ACTIVATION_CODE } from '../../operations';

interface ResetActivationCodeProviderProps {
  children: ReactNode;
}

export const ResetActivationCodeProvider: FC<
  ResetActivationCodeProviderProps
> = ({ children }) => {
  const navigate = useNavigate();
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  return (
    <Providers.Accounts.Mutations.ResetActivationCodeProvider
      mutation={{
        documentNode: RESET_ACTIVATION_CODE_PAGE_RESET_ACTIVATION_CODE,
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
              message: 'Email sent with Activation Instructions.',
              header: 'Code Updated',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.ResetActivationCodeProvider>
  );
};
