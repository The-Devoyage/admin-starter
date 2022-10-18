import { CCol } from '@coreui/react';
import { useContext } from 'react';
import { Hooks } from '@the-devoyage/orions-arrow';
import { UserDetailsCard, UserOverviewCard } from 'src/components/users';
import { UserPage_GetUsersQuery } from 'src/types/generated';
import { UserPageContext } from '../provider/user-page-provider';

export const UserPageLeft = () => {
  const { user_id, setUpdateUserModalVisible } = useContext(UserPageContext);
  const { loading, utils } =
    Hooks.Users.useGetUsers<UserPage_GetUsersQuery['getUsers']['data'][0]>();

  if (!user_id) return null;

  const user = utils.getUser(user_id);

  return (
    <>
      <CCol lg={12}>
        <UserOverviewCard user={user} loading={loading} />
      </CCol>
      <CCol lg={12} className="mt-3">
        <UserDetailsCard
          user={user}
          loading={loading}
          setUpdateUserModalVisible={setUpdateUserModalVisible}
        />
      </CCol>
    </>
  );
};
