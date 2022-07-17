import { CCol, CRow } from '@coreui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import {
  BooleanFilterByEnum,
  OperatorFieldConfigEnum,
  StringFilterByEnum,
} from 'src/types/generated';
import { UserPageRight, UserPageLeft } from './views';

const UserPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const user_id = params.get('user_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id || !Utils.isValidObjectId(user_id)) {
      return navigate('/lost', { replace: true });
    }

    return undefined;
  }, [user_id, navigate]);

  if (!user_id) {
    return null;
  }

  return (
    <Providers.Users.Queries.UserPageProvider
      getUsersInput={{
        config: { pagination: { limit: 1 } },
        query: {
          _id: [{ string: user_id, filterBy: StringFilterByEnum.Objectid }],
        },
      }}
      membershipsAccountUsersInput={{
        config: { pagination: { limit: 1 } },
        query: {
          memberships: [
            {
              default: {
                bool: true,
                filterBy: BooleanFilterByEnum.Eq,
                operator: OperatorFieldConfigEnum.And,
                groups: ['account_users.and'],
              },
            },
          ],
        },
      }}
    >
      <CRow>
        <CCol md={12} lg={6}>
          <UserPageLeft />
        </CCol>
        <CCol md={12} lg={6}>
          <UserPageRight />
        </CCol>
      </CRow>
    </Providers.Users.Queries.UserPageProvider>
  );
};

export default UserPage;
