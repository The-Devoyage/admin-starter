import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import { USERS_PAGE_CREATE_USER } from '../../operations/mutation';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { useNavigate } from 'react-router-dom';

interface CreateUserProviderProps {
  children: ReactNode;
}

export const CreateUserProvider: FC<CreateUserProviderProps> = ({
  children,
}) => {
  const { handleFormSuccess, handleFormError } = useFormHelpers();
  const navigate = useNavigate();

  return (
    <Providers.Users.Mutations.CreateUserProvider
      mutation={{
        documentNode: USERS_PAGE_CREATE_USER,
        onCompleted: (data, helpers, reset) =>
          handleFormSuccess({
            reset,
            helpers,
            callback: () =>
              location.pathname === '/users' &&
              navigate(`/users/user?user_id=${data._id}`),
            success: { header: 'Success', message: 'User Created!' },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({
            reset,
            helpers,
            error,
          }),
      }}
    >
      {children}
    </Providers.Users.Mutations.CreateUserProvider>
  );
};
