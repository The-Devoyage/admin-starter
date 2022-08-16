import { FC } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { Providers } from '@the-devoyage/orions-arrow';
import { Hooks } from '@the-devoyage/orions-arrow';
import {
  Account,
  AccountSelect_GetAccountsQuery,
  BooleanFilterByEnum,
  OperatorFieldConfigEnum,
  StringFilterByEnum,
} from 'src/types/generated';
import { Utils } from 'src/common';
import { ACCOUNT_SELECT_GET_ACCOUNTS } from './query';

type HandleChangeArg = SingleValue<{
  value: Pick<Account, '_id'>;
  label: string;
}>;

interface AccountSelectProps {
  value: SingleValue<Pick<Account, '_id'>>;
  handleChange: (v: HandleChangeArg) => void;
  loading: boolean;
  disabled?: boolean;
}

export const AccountSelect: FC<AccountSelectProps> = ({
  value,
  handleChange,
  loading,
  disabled,
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
    <AccountSelectInput
      value={value}
      disabled={disabled}
      handleChange={handleChange}
      loading={loading}
    />
  </Providers.Accounts.Queries.GetAccountsProvider>
);

const AccountSelectInput: FC<AccountSelectProps> = ({
  value,
  loading,
  handleChange,
  disabled,
}) => {
  const {
    accounts,
    handleSearch,
    utils,
    loading: loadingAccounts,
  } = Hooks.Accounts.useGetAccounts<
    AccountSelect_GetAccountsQuery['getAccounts']['data'][0]
  >();

  return (
    <ReactSelect
      name="account"
      placeholder="Account Owner"
      options={accounts.map((a) => {
        const accountOwner = utils.getDefaultUser(a._id);
        return {
          label: `${Utils.Users.determineName(a, accountOwner)}'s account`,
          value: a._id,
        };
      })}
      isMulti={false}
      onChange={(v) => handleChange(v as HandleChangeArg)}
      onInputChange={handleSearch}
      isDisabled={loading || disabled}
      isLoading={loadingAccounts || loading}
      filterOption={() => true}
      isClearable
      value={
        value?._id && {
          value: value?._id,
          label: `${Utils.Users.determineName(
            accounts.find((a) => a._id === value?._id) ?? null,
            utils.getDefaultUser(
              accounts.find((a) => a._id === value?._id)?._id ?? '',
            ),
          )}'s Account`,
        }
      }
    />
  );
};
