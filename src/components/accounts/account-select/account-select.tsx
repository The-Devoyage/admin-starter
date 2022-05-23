import { FC } from 'react';
import { SingleValue } from 'react-select';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { ReactSelect } from 'src/common/inputs';
import {
  Account,
  BooleanFilterByEnum,
  OperatorFieldConfigEnum,
  StringFilterByEnum,
} from 'src/types/generated';

type HandleChangeArg = SingleValue<{
  value: Pick<Account, '_id'> | undefined;
  label: string;
}>;

interface AccountSelectProps {
  value: SingleValue<{
    value: Pick<Account, '_id'>;
  }>;
  handleChange: (v: HandleChangeArg) => void;
  loading: boolean;
}

export const AccountSelect: FC<AccountSelectProps> = ({
  value,
  handleChange,
  loading,
}) => (
  <Providers.Accounts.Queries.AccountSelectProvider
    getUsersInput={{
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
    }}
    getAccountsInput={{
      query: {
        _id: value?.value
          ? [
              {
                string: value.value as unknown as string,
                filterBy: StringFilterByEnum.Objectid,
                operator: OperatorFieldConfigEnum.And,
              },
            ]
          : undefined,
      },
    }}
  >
    <Providers.Accounts.Queries.AccountSelectProviderContext.Consumer>
      {({ accounts, handleSearch, getAccountOwner }) => (
        <ReactSelect
          name="account"
          placeholder="Account Owner"
          options={accounts.map((a) => {
            const accountOwner = getAccountOwner(a);
            return {
              label: `${Utils.Users.determineName(a, accountOwner)}'s account`,
              value: a._id,
            };
          })}
          isMulti={false}
          onChange={(v) => handleChange(v as HandleChangeArg)}
          onInputChange={handleSearch}
          isDisabled={loading || !!value?.value}
          filterOption={() => true}
          value={
            value?.value && {
              value: value?.value,
              label: `${Utils.Users.determineName(
                accounts.find((a) => a._id === value?.value) ?? null,
                getAccountOwner(
                  accounts.find((a) => a._id === value?.value) ?? null,
                ),
              )}'s Account`,
            }
          }
        />
      )}
    </Providers.Accounts.Queries.AccountSelectProviderContext.Consumer>
  </Providers.Accounts.Queries.AccountSelectProvider>
);
