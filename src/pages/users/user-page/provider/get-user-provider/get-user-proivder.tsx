import { FC, ReactNode, useContext } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import {
  BooleanFilterByEnum,
  OperatorFieldConfigEnum,
  StringFilterByEnum,
} from 'src/types/generated';
import { USER_PAGE_GET_USERS } from '../../operations';
import { UserPageContext } from '../user-page-provider';

interface GetUserProviderProps {
  children: ReactNode;
}

export const GetUserProvider: FC<GetUserProviderProps> = ({ children }) => {
  const { user_id } = useContext(UserPageContext);

  return (
    <Providers.Users.Queries.GetUsersProvider
      query={{
        documentNode: USER_PAGE_GET_USERS,
        variables: {
          getUsersInput: {
            config: { pagination: { limit: 1 } },
            query: {
              _id: [
                { string: user_id!, filterBy: StringFilterByEnum.Objectid },
              ],
            },
          },
          membershipsAccountUsersInput: {
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
          },
        },
      }}
    >
      {children}
    </Providers.Users.Queries.GetUsersProvider>
  );
};
