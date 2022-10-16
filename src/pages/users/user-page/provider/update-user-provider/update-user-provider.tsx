import { Providers, Hooks } from '@the-devoyage/orions-arrow';
import { FC, ReactNode, useContext } from 'react';
import { useFormHelpers } from 'src/common/utils/use-form-helpers';
import {
  StringFilterByEnum,
  UserInput,
  UserPage_GetUsersQuery,
} from 'src/types/generated';
import { USER_PAGE_UPDATE_USER } from '../../operations/mutation';
import { UserPageContext } from '../user-page-provider';

interface UpdateUserProviderProps {
  children: ReactNode;
}

export const UpdateUserProvider: FC<UpdateUserProviderProps> = ({
  children,
}) => {
  const { user_id, setUpdateUserModalVisible } = useContext(UserPageContext);
  const { handleFormError, handleFormSuccess } = useFormHelpers();
  const { utils } =
    Hooks.Users.useGetUsers<UserPage_GetUsersQuery['getUsers']['data'][0]>();

  if (!user_id) return null;

  const user = utils.getUser(user_id);

  return (
    <Providers.Users.Mutations.UpdateUserProvider
      mutation={{
        documentNode: USER_PAGE_UPDATE_USER,
        variables: {
          query: {
            _id: [
              {
                string: user_id,
                filterBy: StringFilterByEnum.Objectid,
              },
            ],
          },
          payload: {
            email: user?.email,
            last_name: user?.last_name,
            first_name: user?.first_name,
            phone: user?.phone,
            about: user?.about,
            image: user?.image?._id,
            address: {
              lineOne: user?.address?.lineOne,
              lineTwo: user?.address?.lineTwo,
              zip: user?.address?.zip,
              city: user?.address?.city,
              state: user?.address?.state,
              country: user?.address?.country,
            },
          },
        },
        onCompleted: (_, helpers, reset) => {
          handleFormSuccess({
            reset,
            helpers,
            success: {
              header: 'Success!',
              message: 'User successfully updated.',
            },
            callback: () => setUpdateUserModalVisible(false),
          });
        },
        onError: (error, helpers, reset) =>
          handleFormError({ error, helpers, reset }),
      }}
    >
      {children}
    </Providers.Users.Mutations.UpdateUserProvider>
  );
};
