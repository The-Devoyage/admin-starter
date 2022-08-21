import { FC } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { Hooks } from '@the-devoyage/orions-arrow';
import { Account, AccountSelect_GetAccountsQuery } from 'src/types/generated';
import { Utils } from 'src/common';
import { AccountSelectRootProvider } from './provider';

interface AccountSelectProps {
  value: Account['_id'];
  handleChange: (v: Account['_id']) => void;
  loading: boolean;
  disabled?: boolean;
}

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
      onChange={(v) =>
        handleChange(
          (v as SingleValue<{ value: string; label: string }>)?.value ?? '',
        )
      }
      onInputChange={handleSearch}
      isDisabled={loading || disabled}
      isLoading={loadingAccounts || loading}
      filterOption={() => true}
      isClearable
      value={
        value && {
          value,
          label: `${Utils.Users.determineName(
            accounts.find((a) => a._id === value) ?? null,
            utils.getDefaultUser(
              accounts.find((a) => a._id === value)?._id ?? '',
            ),
          )}'s Account`,
        }
      }
    />
  );
};

export const AccountSelect: FC<AccountSelectProps> = ({
  value,
  loading,
  handleChange,
  disabled,
}) => (
  <AccountSelectRootProvider value={{ _id: value }}>
    <AccountSelectInput
      value={value}
      loading={loading}
      handleChange={handleChange}
      disabled={disabled}
    />
  </AccountSelectRootProvider>
);
