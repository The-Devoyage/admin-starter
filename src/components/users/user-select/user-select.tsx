import { Hooks } from '@the-devoyage/orions-arrow';
import { FC } from 'react';
import ReactSelect, { SingleValue } from 'react-select';
import { Utils } from 'src/common';
import { User, UserSelect_GetUsersQuery } from 'src/types/generated';
import { UserSelectRootProvider } from './provider';

interface UserSelectProps {
  value: User['_id'];
  handleChange: (v: User['_id']) => void;
  loading: boolean;
  disabled?: boolean;
}

const UserSelectInput: FC<UserSelectProps> = ({
  value,
  handleChange,
  loading,
  disabled,
}) => {
  const { users, handleSearch, utils } =
    Hooks.Users.useGetUsers<UserSelect_GetUsersQuery['getUsers']['data'][0]>();

  return (
    <ReactSelect
      placeholder="Select User"
      options={users?.map((u) => ({ label: u.email, value: u._id }))}
      isMulti={false}
      onChange={(v) =>
        handleChange(
          (v as SingleValue<{ label: string; value: string }>)?.value ?? '',
        )
      }
      onInputChange={(v) => handleSearch(v)}
      isLoading={loading}
      isClearable
      value={
        value && {
          value,
          label: Utils.Users.determineName(null, utils.getUser(value)),
        }
      }
      isDisabled={loading || disabled}
      filterOption={() => true}
    />
  );
};

export const UserSelect: FC<UserSelectProps> = ({
  value,
  handleChange,
  loading,
  disabled,
}) => (
  <UserSelectRootProvider value={{ _id: value }}>
    <UserSelectInput
      value={value}
      handleChange={handleChange}
      loading={loading}
      disabled={disabled}
    />
  </UserSelectRootProvider>
);
