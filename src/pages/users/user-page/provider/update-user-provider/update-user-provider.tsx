import { FC, ReactNode, useContext } from 'react';
import { Providers } from 'src/apollo';
import { useGetUsersContext } from 'src/apollo/providers/users/queries';
import {
  StringFilterByEnum,
  UserPage_GetUsersQuery,
} from 'src/types/generated';
import { UserPageContext } from '../user-page-provider';

interface UpdateUserProviderProps {
  children: ReactNode;
}

export const UpdateUserProvider: FC<UpdateUserProviderProps> = ({
  children,
}) => {
  const { user_id } = useContext(UserPageContext);
  const { utils } =
    useGetUsersContext<UserPage_GetUsersQuery['getUsers']['data'][0]>();
  const user = utils.getUser(user_id!);

  return (
    <Providers.Users.Mutations.UpdateUserProvider
      updateUserInput={{
        query: {
          _id: [
            {
              string: user?._id!,
              filterBy: StringFilterByEnum.Objectid,
            },
          ],
        },
        payload: {
          email: user?.email,
          image: user?.image?._id,
          phone: user?.phone,
          about: user?.about,
          address: {
            lineOne: user?.address?.lineOne,
            lineTwo: user?.address?.lineTwo,
            zip: user?.address?.zip,
            city: user?.address?.city,
            state: user?.address?.state,
            country: user?.address?.country,
          },
          last_name: user?.last_name,
          first_name: user?.first_name,
        },
      }}
    >
      {children}
    </Providers.Users.Mutations.UpdateUserProvider>
  );
};
