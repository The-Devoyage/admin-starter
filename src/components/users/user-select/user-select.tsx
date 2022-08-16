import { FC } from 'react';
import ReactSelect from 'react-select';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';

interface UserSelectProps {
  value: User['_id'];
  handleChange: (v: User['_id']) => void;
  loading: boolean;
  disabled?: boolean;
  handleSearch: (v: string) => void;
  users: Pick<User, '_id' | 'email' | 'first_name' | 'last_name'>[];
}

export const UserSelect: FC<UserSelectProps> = ({
  value,
  handleChange,
  loading,
  disabled,
  handleSearch,
  users,
}) => {
  return (
    <ReactSelect
      placeholder="Select User"
      options={users?.map((u) => ({ label: u.email, value: u._id }))}
      isMulti={false}
      onChange={(v) => v?.value && handleChange(v?.value)}
      onInputChange={(v) => handleSearch(v)}
      isLoading={loading}
      isClearable
      value={
        value
          ? {
              value,
              label: Utils.Users.determineName(
                null,
                users?.find((u) => u._id === value) ?? null,
              ),
            }
          : null
      }
      isDisabled={loading || disabled}
      filterOption={() => true}
    />
  );
};
