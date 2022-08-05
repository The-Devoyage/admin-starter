import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { useGetUsersContext } from 'src/apollo/providers/users/queries';
import { UserDetailsCard, UserOverviewCard } from 'src/components/users';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageLeft = () => {
  const { user_id } = useContext(UserPageContext);
  const { loading, utils } =
    useGetUsersContext<UserPage_GetUsersQuery['getUsers']['data'][0]>();

  const user = utils.getUser(user_id!);

  return (
    <>
      <CCol lg={12}>
        <UserOverviewCard user={user} loading={loading} />
      </CCol>
      <CCol lg={12} className="mt-3">
        <UserDetailsCard user={user} loading={loading} />
      </CCol>
    </>
  );
};
