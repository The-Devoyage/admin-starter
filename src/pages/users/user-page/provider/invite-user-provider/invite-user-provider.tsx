import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode, useContext } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import { StringFilterByEnum } from 'src/types/generated';
import { USER_PAGE_INVITE_USER } from '../../operations/mutation';
import { UserPageContext } from '../user-page-provider';

interface InviteUserProviderProps {
  children: ReactNode;
}

export const InviteUserProvider: FC<InviteUserProviderProps> = ({
  children,
}) => {
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const { user_id } = useContext(UserPageContext);

  return (
    <Providers.Users.Mutations.InviteUserProvider
      mutation={{
        documentNode: USER_PAGE_INVITE_USER,
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
            helpers,
            reset,
            success: { header: 'Success', message: 'Invite Sent!' },
          }),
        onError: (error, helpers, reset) =>
          handleFormError({ error, reset, helpers }),
      }}
    >
      {children}
    </Providers.Users.Mutations.InviteUserProvider>
  );
};
