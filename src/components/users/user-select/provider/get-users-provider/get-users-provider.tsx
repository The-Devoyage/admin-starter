import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode } from 'react';
import { SingleValue } from 'react-select';
import { StringFilterByEnum, User } from 'src/types/generated';
import { USER_SELECT_GET_USERS } from '../../operations';

interface GetUsersProviderProps {
  children: ReactNode;
  value: SingleValue<Pick<User, '_id'>>;
}

export const GetUsersProvider: FC<GetUsersProviderProps> = ({
  children,
  value,
}) => (
  <Providers.Users.Queries.GetUsersProvider
    query={{
      documentNode: USER_SELECT_GET_USERS,
      variables: {
        getUsersInput: {
          query: {
            _id: value?._id
              ? [
                  {
                    string: value._id,
                    filterBy: StringFilterByEnum.Objectid,
                  },
                ]
              : undefined,
          },
        },
      },
    }}
  >
    {children}
  </Providers.Users.Queries.GetUsersProvider>
);
