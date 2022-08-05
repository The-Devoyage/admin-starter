import { FC, ReactNode } from 'react';
import { Providers } from 'src/apollo';
import {
  DateFilterByEnum,
  HistoryFilterIntervalEnum,
  OperatorFieldConfigEnum,
} from 'src/types/generated';
import { ACCOUNT_COUNT_WIDGET_GET_ACCOUNTS } from '../../operations';
import dayjs from 'dayjs';

interface GetAccountsProviderProps {
  children: ReactNode;
}

export const GetAccountsProvider: FC<GetAccountsProviderProps> = ({
  children,
}) => {
  return (
    <Providers.Accounts.Queries.GetAccountsProvider
      query={{
        documentNode: ACCOUNT_COUNT_WIDGET_GET_ACCOUNTS,
        variables: {
          getAccountsInput: {
            config: {
              history: { interval: [HistoryFilterIntervalEnum.Month] },
            },
            query: {
              createdAt: [
                {
                  filterBy: DateFilterByEnum.Gte,
                  date: dayjs(`1/1/${dayjs().year()}`).toDate(),
                  groups: ['account_widget.and'],
                  operator: OperatorFieldConfigEnum.And,
                },
                {
                  filterBy: DateFilterByEnum.Lt,
                  date: dayjs(`1/1/${dayjs().year() + 1}`).toDate(),
                  groups: ['account_widget.and'],
                  operator: OperatorFieldConfigEnum.And,
                },
              ],
            },
          },
        },
      }}
    >
      {children}
    </Providers.Accounts.Queries.GetAccountsProvider>
  );
};
