import { useContext } from 'react';
import { Providers } from 'src/apollo';
import { Hooks } from '@the-devoyage/orions-arrow';
import { InviteUserModal, UserMembershipsCard } from 'src/components/users';
import { UpdateUserMembershipModal } from 'src/components/users/update-user-membership-modal';
import {
  StringFilterByEnum,
  UserPage_GetUsersQuery,
} from 'src/types/generated';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageRight = () => {
  const { user_id } = useContext(UserPageContext);
  const { loading, utils } =
    Hooks.Users.useGetUsersContext<
      UserPage_GetUsersQuery['getUsers']['data'][0]
    >();

  const user = utils.getUser(user_id!);

  return (
    <Providers.Users.Mutations.InviteUserProvider
      inviteUserInput={{
        query: {
          _id: [
            {
              string: user?._id!,
              filterBy: StringFilterByEnum.Objectid,
            },
          ],
        },
        payload: {},
      }}
    >
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
          payload: {},
        }}
      >
        <>
          <UserMembershipsCard loading={loading} user={user} />
          <UpdateUserMembershipModal />
          <InviteUserModal />
        </>
      </Providers.Users.Mutations.UpdateUserProvider>
    </Providers.Users.Mutations.InviteUserProvider>
  );
};
