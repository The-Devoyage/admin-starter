import { Providers } from 'src/apollo';
import { InviteUserModal, UserMembershipsCard } from 'src/components/users';
import { UpdateUserMembershipModal } from 'src/components/users/update-user-membership-modal';
import { StringFilterByEnum } from 'src/types/generated';

export const UserPageRight = () => (
  <Providers.Users.Queries.UserPageProviderContext.Consumer>
    {({ loading, user }) => (
      <Providers.Users.Mutations.InviteUserProvider
        inviteUserInput={{
          query: {
            _id: [
              {
                string: user?._id,
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
                  string: user?._id,
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
    )}
  </Providers.Users.Queries.UserPageProviderContext.Consumer>
);
