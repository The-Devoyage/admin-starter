import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Providers } from '@the-devoyage/orions-arrow';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { REGISTER_PAGE_REGISTER_ACCOUNT } from '../../operations';

interface RegisterAccountProviderProps {
  children: ReactNode;
}

export const RegisterAccountProvider: FC<RegisterAccountProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();

  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.RegisterAccontProvider
      mutation={{
        documentNode: REGISTER_PAGE_REGISTER_ACCOUNT,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            success: {
              message: 'Account Registered. Check Email for Activation.',
              header: 'Success',
            },
            callback: () => navigate('/login'),
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.RegisterAccontProvider>
  );
};
