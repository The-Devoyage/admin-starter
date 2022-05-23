import { FC } from 'react';
import { SingleValue } from 'react-select';
import { Providers } from 'src/apollo';
import { Utils } from 'src/common';
import { ReactSelect } from 'src/common/inputs';
import {
  StringFilterByEnum,
  User,
  UserSelect_GetUsersQuery,
} from 'src/types/generated';

type HandleChangeArg = SingleValue<{
  value: Pick<User, '_id'> | undefined;
  label: string;
  user?: UserSelect_GetUsersQuery['getUsers']['data'][0];
}>;

interface UserSelectProps {
  value: SingleValue<{
    value: Pick<User, '_id'> | null;
  }>;
  handleChange: (v: HandleChangeArg) => void;
  loading: boolean;
}

export const UserSelect: FC<UserSelectProps> = ({
  value,
  handleChange,
  loading,
}) => (
  <Providers.Users.Queries.UserSelectProvider
    getUsersInput={{
      query: {
        _id: value?.value?._id
          ? [
              {
                string: value?.value?._id,
                filterBy: StringFilterByEnum.Objectid,
              },
            ]
          : undefined,
      },
    }}
  >
    <Providers.Users.Queries.UserSelectProviderContext.Consumer>
      {({ users, handleSearch }) => (
        <ReactSelect
          placeholder="User"
          options={users?.map((u) => ({
            label: `${Utils.Users.determineName(null, u)}`,
            value: { _id: u._id },
            user: u,
          }))}
          isMulti={false}
          onChange={(v) => handleChange(v as HandleChangeArg)}
          onInputChange={handleSearch}
          isDisabled={loading || value?.value?._id}
          filterOption={() => true}
          value={
            value?.value?._id && {
              value: value?.value._id,
              user: users?.find((u) => u._id === value?.value?._id),
              label: `${Utils.Users.determineName(
                null,
                users?.find((u) => u._id === value?.value?._id) ?? null,
              )}`,
            }
          }
        />
      )}
    </Providers.Users.Queries.UserSelectProviderContext.Consumer>
  </Providers.Users.Queries.UserSelectProvider>
);
