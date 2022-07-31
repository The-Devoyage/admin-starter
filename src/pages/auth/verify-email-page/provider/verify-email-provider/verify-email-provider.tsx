import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Providers } from 'src/apollo';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { VERIFY_EMAIL_PAGE_VERIFY_EMAIL } from '../../operations';

interface VerifyEmailProviderProps {
  children: ReactNode;
}

export const VerifyEmailProvider: FC<VerifyEmailProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const navigate = useNavigate();

  return (
    <Providers.Accounts.Mutations.VerifyEmailProvider
      mutation={{
        documentNode: VERIFY_EMAIL_PAGE_VERIFY_EMAIL,
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            helpers,
            reset,
            callback: () => {
              navigate('/login');
            },
            success: {
              message: 'Account Email Verified!',
              header: 'Verify Email',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ reset, helpers, error }),
      }}
    >
      {children}
    </Providers.Accounts.Mutations.VerifyEmailProvider>
  );
};
