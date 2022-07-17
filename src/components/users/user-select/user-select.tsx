import { FC } from 'react';
import ReactSelect from 'react-select';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { StringFilterByEnum, User } from 'src/types/generated';

interface UserSelectProps {
  value: User['_id'];
  handleChange: (v: User['_id']) => void;
  loading: boolean;
  disabled?: boolean;
}

export const UserSelect: FC<UserSelectProps> = ({
  value,
  handleChange,
  loading,
  disabled,
}) => {
  return (
    <Providers.Users.Queries.UserSelectProvider
      getUsersInput={{
        query: {
          _id: value
            ? [
                {
                  string: value,
                  filterBy: StringFilterByEnum.Objectid,
                },
              ]
            : undefined,
        },
      }}
    >
      <Providers.Users.Queries.UserSelectProviderContext.Consumer>
        {({ users, handleSearch, loading: loadingUsers }) => (
          <ReactSelect
            placeholder="Select User"
            options={users?.map((u) => ({ label: u.email, value: u._id }))}
            isMulti={false}
            onChange={(v) => v?.value && handleChange(v?.value)}
            onInputChange={(v) => handleSearch(v)}
            isLoading={loadingUsers}
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
        )}
      </Providers.Users.Queries.UserSelectProviderContext.Consumer>
    </Providers.Users.Queries.UserSelectProvider>
  );
};
