import { CCol } from '@coreui/react';
import { Providers } from 'src/apollo';
import { UserDetailsCard, UserOverviewCard } from 'src/components/users';
import { StringFilterByEnum } from 'src/types/generated';

export const UserPageLeft = () => (
  <Providers.Users.Queries.UserPageProviderContext.Consumer>
    {({ user, loading }) => (
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
        <>
          <CCol lg={12}>
            <UserOverviewCard user={user} loading={loading} />
          </CCol>
          <CCol lg={8} className="mt-3">
            <UserDetailsCard user={user} loading={loading} />
          </CCol>
        </>
      </Providers.Users.Mutations.UpdateUserProvider>
    )}
  </Providers.Users.Queries.UserPageProviderContext.Consumer>
);
