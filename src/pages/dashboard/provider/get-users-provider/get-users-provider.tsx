import { Providers } from '@the-devoyage/orions-arrow';
import { FC, ReactNode } from 'react';
import {
  DateFilterByEnum,
  HistoryFilterIntervalEnum,
  OperatorFieldConfigEnum,
} from 'src/types/generated';
import { USER_COUNT_WIDGET_GET_USERS } from '../../operations';
import dayjs from 'dayjs';

interface GetUsersProviderProps {
  children: ReactNode;
}

export const GetUsersProvider: FC<GetUsersProviderProps> = ({ children }) => {
  return (
    <Providers.Users.Queries.GetUsersProvider
      query={{
        documentNode: USER_COUNT_WIDGET_GET_USERS,
        variables: {
          getUsersInput: {
            config: {
              history: { interval: [HistoryFilterIntervalEnum.Month] },
            },
            query: {
              createdAt: [
                {
                  filterBy: DateFilterByEnum.Gte,
                  date: dayjs(`1/1/${dayjs().year()}`).toDate(),
                  groups: ['users_widget.and'],
                  operator: OperatorFieldConfigEnum.And,
                },
                {
                  filterBy: DateFilterByEnum.Lt,
                  date: dayjs(`1/1/${dayjs().year() + 1}`).toDate(),
                  groups: ['users_widget.and'],
                  operator: OperatorFieldConfigEnum.And,
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
