import { FC, ReactNode } from 'react';
import { Providers } from '@the-devoyage/orions-arrow';
import {
  Account,
  BooleanFilterByEnum,
  OperatorFieldConfigEnum,
  StringFilterByEnum,
} from 'src/types/generated';
import { SingleValue } from 'react-select';
import { ACCOUNT_SELECT_GET_ACCOUNTS } from '../../operations';

interface GetAccountsProviderProps {
  children: ReactNode;
  value: SingleValue<Pick<Account, '_id'>>;
}

export const GetAccountsProvider: FC<GetAccountsProviderProps> = ({
  children,
  value,
}) => (
  <Providers.Accounts.Queries.GetAccountsProvider
    query={{
      documentNode: ACCOUNT_SELECT_GET_ACCOUNTS,
      variables: {
        getAccountsInput: {
          query: {
            _id: value?._id
              ? [
                  {
                    string: value._id,
                    filterBy: StringFilterByEnum.Objectid,
                    operator: OperatorFieldConfigEnum.And,
                  },
                ]
              : undefined,
          },
        },
        getUsersInput: {
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
          config: { pagination: { limit: 1 } },
        },
      },
    }}
  >
    {children}
  </Providers.Accounts.Queries.GetAccountsProvider>
);
