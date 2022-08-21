import { FC, ReactNode } from 'react';
import { SingleValue } from 'react-select';
import { Utils } from 'src/common';
import { User } from 'src/types/generated';
import { GetUsersProvider } from './get-users-provider';

interface UserSelectRootProvider {
  children: ReactNode;
  value: SingleValue<Pick<User, '_id'>>;
}

export const UserSelectRootProvider: FC<UserSelectRootProvider> = ({
  children,
  value,
}) => (
  <Utils.Compose components={[GetUsersProvider]} value={value}>
    {children}
  </Utils.Compose>
);
