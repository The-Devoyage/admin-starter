import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode, useContext } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { StringFilterByEnum } from 'src/types/generated';
import { USER_PAGE_UPDATE_USER } from '../../operations/mutation';
import { UserPageContext } from '../user-page-provider';

interface UpdateUserProviderProps {
  children: ReactNode;
}

export const UpdateUserProvider: FC<UpdateUserProviderProps> = ({
  children,
}) => {
  const { user_id } = useContext(UserPageContext);
  const { handleFormError, handleFormSuccess } = useFormHelpers();

  return (
    <Providers.Users.Mutations.UpdateUserProvider
      mutation={{
        documentNode: USER_PAGE_UPDATE_USER,
        variables: {
          query: {
            _id: [
              {
                string: user_id!,
                filterBy: StringFilterByEnum.Objectid,
              },
            ],
          },
          payload: {},
        },
        onCompleted: (_, helpers, reset) =>
          handleFormSuccess({
            reset,
            helpers,
            success: {
              header: 'Success!',
              message: 'User successfully updated.',
            },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ error, helpers, reset }),
      }}
    >
      {children}
    </Providers.Users.Mutations.UpdateUserProvider>
  );
};
